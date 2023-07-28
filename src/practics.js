

import RecordIcon from "./RecordIcon.js"

import React from 'react'

import axios from 'axios'

function RecordMessage() {



    const [TotalMessages, SetTotal] = React.useState([])

    function ConvertBlobToUrl(data) {

        const blob = new Blob([data], { type: "audio/mpeg" })

        const rachelblobUrl = window.URL.createObjectURL(blob)

        return rachelblobUrl







    }



    const handleStop = async (mediaBlobUrl) => {

        console.log(mediaBlobUrl)

        const myMessage = { "sender": "me", "audiobloburl": mediaBlobUrl }

        const collectionOfMessages = [...TotalMessages, myMessage]

        //collectionOfMessages.push(myMessage)



        const response = await fetch(mediaBlobUrl)

        const raw_data = await response.blob()

        console.log(raw_data)



        const form = new FormData()

        form.append("file", raw_data, "myrecord.wav")

        const res = await axios.post("http://127.0.0.1:8000/post-audio", form,

            {

                headers: { "Content-Type": "audio/mpeg" },

                responseType: "arraybuffer"







            }

        )



        console.log(res)



        const binary_file = res.data

        const rachelUrl = ConvertBlobToUrl(binary_file)

        const rachelMessage = { sender: "rachel", audiobloburl: rachelUrl }

        collectionOfMessages.push(rachelMessage)



        console.log(collectionOfMessages)

        SetTotal(collectionOfMessages)







































    }

    return (

        <>















            <div class="mt-5 px-5">

                {



                    TotalMessages.map((audio) => {



                        return (



                            <div class={audio.sender == "me" ?

                                "flex flex-col " : "flex flex-col items-end"}>



                                <div >

                                    <p class={audio.sender == "me" ?

                                        "text-blue-500" : "text-right text-green-500"}>{audio.sender}</p>



                                    <audio src={audio.audiobloburl} controls />







                                </div>



                            </div>



                        )









                    })





                }











            </div>





            <div class="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r from-sky-500 to-green-500">

                <div class="flex justify-center items-center w-full">



                    <RecordIcon paramStop={handleStop} />

                </div>

            </div>



        </>

    )

}



export default RecordMessage