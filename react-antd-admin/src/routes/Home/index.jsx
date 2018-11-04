import React from 'react'
import {Carousel} from 'antd'
//import './style.css'

const imgs = [
    '1',
    '2',
    '3',
    '4'
]

class Home extends React.Component {
    render() {
        return (
            <div style={styles.bg} className='home'>
                <Carousel arrows effect='fade' className='size'>
                    <div><h3>{imgs[0]}</h3></div>
                    <div><h3>{imgs[0]}</h3></div>
                    <div><h3>{imgs[0]}</h3></div>
                    <div><h3>{imgs[0]}</h3></div>
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