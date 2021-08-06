import React from 'react'
import classnames from 'classnames'

import s from './About.module.scss'

type AboutProps = {
    className?: string
}

const About = ({ className }: AboutProps) => {
    const cx: string = classnames(s.container, className)

    return (
        <div className={cx}>
            <h6>About</h6>
            <div className="d-none d-md-flex flex-md-column justify-content-md-center align-items-md-center">
                <p>
                    How many people paid crypto to see how many people paid
                    crypto
                </p>
                <p>is about a visually fun way to see how many people paid</p>
                <p>crypto to see how many people paid crypto. This site was</p>
                <p>
                    inspired by dogecoin, human creativity, humor, and most of
                </p>
                <p>all a father dedicated to his little mountain.</p>
            </div>
            <div className="d-xs-block d-md-none">
                <p>
                    How many people paid crypto to see how many people paid
                    crypto is about a visually fun way to see how many people
                    paid crypto to see how many people paid crypto. This site
                    was inspired by dogecoin, human creativity, humor, and most
                    of all a father dedicated to his little mountain.
                </p>
            </div>
        </div>
    )
}

export default About
