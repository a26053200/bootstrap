import React from 'react'
import {Carousel} from 'antd'
//import './style.css'
import MyBreadcrumb from "../../components/MyBreadcrumb/index";

const imgs = [
    '1',
    '2',
    '3',
    '4'
]

class Home extends React.Component {
    render() {
        const paths = this.props.match.params.path.split(",")
        return (
            <div className='home'>
                <MyBreadcrumb paths={paths} />
                <Carousel arrows effect='fade' className='size'>
                    <div><h3>{imgs[0]}</h3></div>
                    <div><h3>{imgs[1]}</h3></div>
                    <div><h3>{imgs[2]}</h3></div>
                    <div><h3>{imgs[3]}</h3></div>
                </Carousel>
            </div>
        )
    }
}

const styles = {
    bg:{
        position:'absolute',
        top:0,
        left:0,
        width:'100%',
        height:'calc(100vh - 64px)'
    }
}

export default Home