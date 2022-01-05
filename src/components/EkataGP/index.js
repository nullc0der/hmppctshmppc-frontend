import React from 'react'

import { EkataGatewayProcessorForm } from './gatewayprocessor'

class EkataGPForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formConfig: {
                projectID:
                    process.env.REACT_APP_EKATA_GATEWAY_PROCESSOR_PROJECT_ID,
                onError: (data) => this.props.onError(data),
                onCloseForm: (reason) => this.props.onCloseForm(reason),
                onSuccess: (data) => this.props.onSuccess(data),
            },
        }
    }

    componentDidMount() {
        this.gpForm = new EkataGatewayProcessorForm(this.state.formConfig)
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.formID !== this.props.formID &&
            this.props.formID.length
        ) {
            this.gpForm.showPaymentForm(this.props.formID)
        }
    }

    render() {
        return null
    }
}

export default EkataGPForm
