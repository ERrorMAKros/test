import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Form, Select, InputNumber, DatePicker, Switch, Slider, Button, message, Row, Col} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

class Application extends Component {

    constructor() {
        super();
        this.state = {
            name: "[ application ]"
        };
    }

    render() {
        return <div>{ this.state.name }</div>;
    }
}
class Layout extends Component {
    constructor() {
        super();
        this.state = {
            formData: {
                inputNumber: undefined,
                static: 'asd',
                switch: undefined,
                slider: undefined,
                select: undefined,
                startDate: undefined,
                endDate: undefined,
            }
        };
    }
    render() {

        console.log( "Demo() render()", this );

        return (
            <Form horizontal>
                <FormItem
                    label="rockets"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 10}}>
                    <Application/>
                </FormItem>

                <FormItem
                    label="InputNumber"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 10}}>
                    <InputNumber size="large" min={1} max={10} style={{width: 100}} defaultValue={3}
                                 name="inputNumber"/>
                    <span className="ant-form-text"> 321</span>
                </FormItem>

                <FormItem
                    label="ninja"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 10}}>
                    <p className="ant-form-text" id="static" name="static">sddf dsf sdf dfdsf</p>
                    <p className="ant-form-text">
                        <a href="#">sdf rrr34r</a>
                    </p>
                </FormItem>

                <FormItem
                    label="хорошо?"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 10}}>
                    <Switch name="switch"/>
                </FormItem>

                <FormItem
                    label="Slider"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 10}}>
                    <Slider marks={['A', 'B', 'C', 'D', 'E', 'F', 'G']} name="slider"/>
                </FormItem>

                <FormItem
                    label="Select"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}>
                    <Select size="large" defaultValue="lucy" style={{width: 200}} name="select">
                        <Option value="jack">jack</Option>
                        <Option value="lucy">lucy</Option>
                        <Option value="disabled" disabled>disabled</Option>
                        <Option value="yiminghe">yiminghe</Option>
                    </Select>
                </FormItem>

                <FormItem
                    label="DatePicker 日期选择框："
                    labelCol={{span: 8}}>
                    <DatePicker name="startDate"/>
                </FormItem>
                <Row>
                    <Col span="16" offset="8">
                        <Button type="primary" htmlType="submit">确定</Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

ReactDOM.render( <Layout/>, document.getElementById('container'));
