import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import { v4 as uuid } from 'uuid';
import { Console } from 'console';
import { render } from 'react-dom';
import { Stage, Layer, Rect, Text, Circle } from 'react-konva';
import Konva from 'konva';

// var ReactCanvas = require('react-canvas');
// var Surface = ReactCanvas.Surface;
// var Image = ReactCanvas.Image;
// var Text = ReactCanvas.Text;

//const WebSocket = require('isomorphic-ws')

//import form from '@material-ui/core/form'

interface FormState {
    //playOrPause?: string;
    num?: number;
    trackCount?: number;
    color: string;
    xPos: number;
    yPos: number;
    zPos: number;
    xMax: number;
    zMax: number;
    xMin: number;
    zMin: number;
    previousPositions: Point[]
  }

  interface SomeObject {
      cool: number;
  }

  interface CarMotionData {
      worldPositionX: number;
      worldPositionY: number;
      worldPositionZ: number;
      index: number;
  }

  interface Point {
      x: number
      y: number
  }
  // simplified CarData

interface FormProps {

}

const id: string = uuid();
var ws = new WebSocket("ws://" + "192.168.1.119:8080" + "/channel")
// var ws = new WebSocket("ws://" + "192.168.1.119:8080" + "/channel", {
//   origin: 'https://websocket.org'
// });
const surfaceWidth = 1000;
const surfaceHeight = 1000;
class InputForm extends Component<FormProps, FormState> {

    constructor(props: FormProps) {
        super(props);

        this.state = {
            num: 1,
            trackCount: 0,
            color: 'green',
            xPos: 0,
            yPos: 0,
            zPos: 0,
            xMax: 0,
            zMax: 0,
            xMin: 0,
            zMin: 0,
            previousPositions: []
        };
    }

    handleInput(something: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        this.setState({
            num: 0
        })
    }

    blobToJson2(blob: Blob) {
        return new Promise((resolve, reject) => {
            let value = blob.arrayBuffer().then((arrayBuffer) => {
                let buffer = Buffer.from(arrayBuffer)
                
                let carMotionData = JSON.parse(buffer.toString()) as CarMotionData;

                let maxX = Math.max(carMotionData.worldPositionX, this.state.xMax) || 0
                let maxZ = Math.max(carMotionData.worldPositionZ, this.state.zMax) || 0
                let minX = Math.min(carMotionData.worldPositionX, this.state.xMin) || 0
                let minZ = Math.min(carMotionData.worldPositionZ, this.state.zMin) || 0
                let normalizedX = this.mapThis(carMotionData.worldPositionX, maxX, minX, surfaceWidth - 50, 50)
                let normalizedZ = this.mapThis(carMotionData.worldPositionZ, maxZ, minZ, surfaceHeight - 50, 50)
                let position = {x: carMotionData.worldPositionX, y: carMotionData.worldPositionZ}
                let newPos = this.state.previousPositions
                console.log(carMotionData.index)
                const state: any = {
                    xPos: normalizedX,
                    yPos: carMotionData.worldPositionY,
                    zPos: normalizedZ,
                    xMax: maxX,
                    zMax: maxZ,
                    xMin: minX,
                    zMin: minZ,
                }
                if (carMotionData.index % 20 === 0) {
                    state.previousPositions = [...this.state.previousPositions, position]
                }
                
                this.setState(state)
                
                resolve(carMotionData)
            })
            // let fr = new FileReader();
            // fr.onload = () => {
            //     resolve(JSON.parse(fr.result));
            // };
            // fr.readAsText(blob);

        });
    }

    getTrail() {
        return this.state.previousPositions.map((val, i) => {
            const normalizedX = this.mapThis(val.x, this.state.xMax, this.state.xMin, surfaceWidth - 50, 50);
            const normalizedY = this.mapThis(val.y, this.state.zMax, this.state.zMin, surfaceHeight - 50, 50);
            
            return ( <Circle
                key={i}
                x={normalizedX}// this.state.x
                y={normalizedY} // this.state.z
                radius={8}
                fill={this.state.color}
            />)
        })
    }

    blobToJson(blob: Blob) : SomeObject {
        let value = blob.arrayBuffer().then
        console.log({value})
        let temp = JSON.parse(JSON.stringify(value)) as SomeObject;
        
        return temp
    }

    WebSocketStart() {
        
        console.log("Web socket start")
        ws = new WebSocket("ws://" + "127.0.0.1:8080" + "/channel")
        ws.onopen = () => {
            this.setState({
                num: 1
            })
            console.log("Socket is opened.");
            //ws.sendJsonBlob({ connect: true })
        }

        ws.onmessage = (event) => {
            console.log({onMessage: event})
            this.blobToJson2(event.data).then((result) => {
                // unpack result
                
            })
            //let response = this.blobToJson(event.data)
            // this.setState({
            //     num: response.cool
            // })
        };
    
        ws.onclose = () => {
            console.log("Socket is closed.");
        };
    }

    mapThis(startVal: number, inMax: number, inMin: number, outMax: number, outMin: number) : number {
        let result = (startVal - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
        console.log({result, startVal, inMax, inMin, outMax, outMin})
        return result //(startVal - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
    }

    render() {
        
        console.log(JSON.stringify(this.state))
        return (
            <div>
                <div style={{margin: "10px"}}>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Email address</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" onChange={e => this.handleInput(e)}/>
                        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                        <Button variant="contained" onClick={() => { this.WebSocketStart() }}>Default</Button>
                    </FormControl>
                    <div>
                        {this.state.xPos}
                    </div>
                    <div>
                        {this.state.yPos}
                    </div>
                    <div>
                        {this.state.zPos}
                    </div>
                    <div>
                        {this.state.xMax}
                    </div>
                </div>
                <div id={"someContainer"} style={{margin: "auto", width: "fit-content"}}>
                    <Stage width={surfaceWidth} height={surfaceHeight}>
                        <Layer>
                            <Rect
                            width={surfaceWidth}
                            height={surfaceHeight}
                            //fill={"red"}
                            stroke={"red"}
                            shadowBlur={5}
                            />
                            <Circle
                                x={this.state.xPos}// this.state.x
                                y={this.state.zPos} // this.state.z
                                draggable
                                radius={10}
                                fill={this.state.color}
                            />
                            {this.getTrail()}
                        </Layer>
                    </Stage>
                    {/* <canvas id="myCanvas" width="578" height="200"></canvas> */}
                    
                </div>
                
            </div>

            // <div>
                

                // { <div style={{margin: "10px"}}>
                //     <FormControl>
                //         <InputLabel htmlFor="my-input">Email address</InputLabel>
                //         <Input id="my-input" aria-describedby="my-helper-text" onChange={e => this.handleInput(e)}/>
                //         <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                //         <Button variant="contained" onClick={() => { this.WebSocketStart() }}>Default</Button>
                //     </FormControl>
                // </div>
            //     HELLO {JSON.stringify(this.state.num)} }
            // </div>
        )
    }
}

export default InputForm;