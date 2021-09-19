import React from 'react';
import { IonSlides, IonSlide, IonContent } from '@ionic/react';
import "./Slides.css"
import ImageWithLove from './ImageWithLove';

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 2,
    spaceBetween: 20,
    // pagination: {
    //     clickable: true,
    // }
};

export const Slides: React.FC = () => (
        <IonSlides pager={true} options={slideOpts}>
            <IonSlide>
                <ImageWithLove 
                    imgSrc="https://cdn0-production-images-kly.akamaized.net/83eNIr6NoNALbf0ukgz4tBEz1ko=/640x360/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3386715/original/094552600_1614241094-Double_Tree_Jakarta.jpg"
                    price="IDR 499.000 / night"
                    name="Hotel Aston Jakarta"/>
            </IonSlide>
            <IonSlide>
                <ImageWithLove 
                    imgSrc="https://pix10.agoda.net/hotelImages/623/62303/62303_15081814520034507359.jpg?s=1024x768"
                    price="IDR 799.000 / night"
                    name="Sultan Hotel & Residence Jakarta"/>
            </IonSlide>
            <IonSlide>
                <ImageWithLove
                    imgSrc="https://lh3.googleusercontent.com/proxy/IWLJTkCOQLkuiGuSDS0qvWN3TBxELrhZkOhWPaGgljjVizVr5lOaW375HsuBdzoCbeDoNCs1kp1EE2j4-l_SyYZFU9xh3W00ql4eNdCHnPvWtZveIyq7RrVnH1Z5PZ_dWCSpmWwrWnQbK-yM9NdxOfb8kp1wNw=w592-h404-n-k-no-v1-rj" 
                    price="IDR 849.000 / night"
                    name="Pullman Hotel Jakarta Central Park"/>
            </IonSlide>
            <IonSlide>
                <ImageWithLove 
                    imgSrc="https://cdn.galaxy.tf/unit-media/tc-default/uploads/images/room_photo/001/571/999/borobudur-suite-bedroom-01-standard.jpg"
                    price="IDR 1.349.000 / night"
                    name="Hotel Borobudur Jakarta"/>
            </IonSlide>
            <IonSlide>
                <ImageWithLove 
                    imgSrc="https://ik.imagekit.io/tvlk/apr-asset/dgXfoyh24ryQLRcGq00cIdKHRmotrWLNlvG-TxlcLxGkiDwaUSggleJNPRgIHCX6/hotel/asset/20033803-0445983e1acc301e5da5b46c400f7955.jpeg?tr=q-40,c-at_max,w-740,h-500&_src=imagekit"
                    price="IDR 2.099.000 / night"
                    name="Mandarin Oriental Jakarta"/>
            </IonSlide>
        </IonSlides>
);

export default Slides;