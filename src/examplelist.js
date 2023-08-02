const ExampleList = ({setForcedText}) => {
    return (
        <div class="flex justify-between">
            <div class="pl-20 pt-16 w-full">
                <h2 class="flex gap-3 items-center m-auto text-2xl font-normal md:flex-col md:gap-2 pb-3.5">
                    <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>Examples</h2>

                <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                    <button class="w-full bg-white text-white-900 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"  style={{background:"#3e404b", textAlign:"left"}} onClick={()=>setForcedText("Capital of USA ?")}>"Capital of USA ?" →</button>
                    <button class="w-full bg-white text-white-900 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"  style={{background:"#3e404b", textAlign:"left"}} onClick={()=>setForcedText("Tell me a joke")}>"Tell me a joke" →</button>
                    <button class="w-full bg-white text-white-900 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900"  style={{background:"#3e404b", textAlign:"left"}} onClick={()=>setForcedText("How does a blockchain work?")}>"How does a blockchain work?" →</button></ul>
            </div>
            <div class="flex flex-col mb-8 md:mb-auto  w-full pt-16 pl-5 ">
                <h2 class="flex gap-3 items-center m-auto text-2xl font-normal md:flex-col md:gap-2 pb-3.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" class="h-6 w-6"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
                    </svg>Capabilities
                </h2>
                <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                    <li class="w-full bg-white text-white-900 dark:bg-white/5 p-3 rounded-md"  style={{background:"#3e404b", textAlign:"left"}}>Personalized Recommendations</li>
                    <li class="w-full bg-white text-white-900 dark:bg-white/5 p-3 rounded-md"  style={{background:"#3e404b", textAlign:"left"}}>Multi-language Support</li>
                    <li class="w-full bg-white text-white-900 dark:bg-white/5 p-3 rounded-md"  style={{background:"#3e404b", textAlign:"left"}}>Task Automation</li>
                </ul>
            </div>
            <div class="flex flex-col mb-8 md:mb-auto  w-full pt-16 pr-20 pl-5">
                <h2 class="flex gap-3 items-center m-auto text-2xl font-normal md:flex-col md:gap-2 pb-3.5">
                    <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>Limitations
                </h2>
                <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                    <li class="w-full bg-white text-white-900 dark:bg-white/5 p-3 rounded-md"  style={{background:"#3e404b", textAlign:"left"}}>Security Concerns</li>
                    <li class="w-full bg-white text-white-900 dark:bg-white/5 p-3 rounded-md"  style={{background:"#3e404b", textAlign:"left"}}>Domain-Specific Knowledge</li>
                    <li class="w-full bg-white text-white-900 dark:bg-white/5 p-3 rounded-md"  style={{background:"#3e404b", textAlign:"left"}}>Unpredictable Errors</li>
                </ul>
            </div>

        </div>


    )
}

export default ExampleList;