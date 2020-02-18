import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
//import form from '@material-ui/core/form'

interface FormState {
    //playOrPause?: string;
    num?: String;
    trackCount?: number;
  }

interface FormProps {

}



class InputForm extends Component<FormProps, FormState> {

    constructor(props: FormProps) {
        super(props);

        this.state = {
            num: "hello",
            trackCount: 0
        };
    }

    handleInput(something: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        this.setState({
            num: something.target.value
        })
    }

    render() {
        return (
            <div>
                <div style={{margin: "10px"}}>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Email address</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" onChange={e => this.handleInput(e)}/>
                        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>

                    </FormControl>
                </div>
                HELLO {JSON.stringify(this.state.num)}
            </div>
        )
    }
}

export default InputForm;