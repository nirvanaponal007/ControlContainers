import React from 'react';

export default class Msm extends React.Component{
    constructor(props){
        super(props)
        this.handleSubmit= this.handleSubmit;
    }

    handleSubmit=()=>{
        const y = this.props.onSumbit()
        // console.log(this.props.data[0]);
    }
    render(){
        return(
            <button onClick = {this.handleSubmit}>Enviar</button>
        )
    }

}