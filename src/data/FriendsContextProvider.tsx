import React, { useState } from 'react'
import { Friend, FriendsContext } from './friend-context'

const FriendsContextProvider: React.FC = props => {
    const [friends, setFriends] = useState<Friend[]>([
        {id: 'f1', name: 'Adi', img: "https://pict-b.sindonews.net/dyn/620/pena/news/2021/08/23/185/519138/ini-penyebab-lord-adi-gagal-melaju-ke-grand-final-masterchef-indonesia-iuo.jpg"},
        {id: 'f2', name: 'Budi', img: "https://cdn.idntimes.com/content-images/post/20191120/budi-setiawan2-9ffe3777769a3b4e15bdd28057f8d0f7.JPG"},
        {id: 'f3', name: 'Cici', img: "https://cdn1-production-images-kly.akamaized.net/m_kqza7cnlqMN00PRAw-ICwm9X0=/640x640/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/991899/original/063975500_1442472613-Cici_Paramida-9.jpg"},
    ])

    const addFriend = (name: string, img: string) => {
        const newFriend: Friend = {
            id: Math.random().toString(),
            name: name,
            img: img,
        }

        setFriends((currFriends) => {
            return currFriends.concat(newFriend)
        })
    }
    const updateFriend = () => {}
    const deleteFriend = () => {}

    return(
        <FriendsContext.Provider value={{
            friends,
            addFriend,
            updateFriend,
            deleteFriend
        }}>
            {props.children}
        </FriendsContext.Provider>
    )
}

export default FriendsContextProvider