import { Component } from 'react';
import css from './Modal.module.css';



export class Modal extends Component {
    
   
	componentDidMount() {
		document.addEventListener('keydown', this.handleEscClose)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleEscClose)
    }
    
    handleEscClose = (evt) => {
		if (evt.code === 'Escape') this.props.onCloseModal()
		console.log('Press')
    }
    
    handleOverlayClose = (evt) => {
        if (evt.target === evt.currentTarget) this.props.onCloseModal()
    }
   
   
    render() {
        const { modalImage: { largeImageURL, tags } }  = this.props;
    return (
        <div className={css.overlay} onClick={this.handleOverlayClose}>
            <div className={css.modal}>
                <img src={largeImageURL}
                     alt={tags} className={css.modal}/>
           </div>
        </div>
    )
}
}