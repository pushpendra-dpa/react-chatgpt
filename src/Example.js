const Example = () => {

    return (

        <div class="flex flex-col ">

            {/*top*/}

            <div>
                <h1 class="text-center text-white pt-5 text-2xl">GPT 3.5</h1>
            </div>
            {/*heading*/}
            <div  >
                <h1 class="text-center font-bold text-4xl pt-20 ">dpaGPT</h1>
            </div>

            {/*examples*/}
            <div class="h-12 mt-10">
            <h2 class="flex gap-8 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
                    </svg>
                    Capabilities</h2>
            
                    <ul class="flex flex-col gap-5 w-full sm:max-w-md m-auto">
                        <li class="w-full bg-#40414f p-3 rounded-md" style={{background:"#40414f"}}>
                            Remembers what user said earlier in the conversation
                        </li>
                    <li class="w-full bg-gray-800  p-3 rounded-md" style={{background:"#40414f"}}>
                            Allows the user to provide follow-up corrections
                    </li>
                    <li class="w-full bg-gray-800  p-3 rounded-md" style={{background:"#40414f"}}>
                         Trained to decline inappropriate requests
                    </li>
                    </ul>
        </div>
    </div>
    )

}




export default Example;