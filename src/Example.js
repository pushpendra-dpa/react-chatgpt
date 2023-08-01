import ExampleList from "./examplelist";
const Example = ({ setSample }) => {

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
            <div>
                <ExampleList setSample={setSample} />

            </div>

            {/*examples*/}

        </div>
    )

}




export default Example;