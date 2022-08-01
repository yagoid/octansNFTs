import InputForm from "../../components/create/InputForm"
import Layout from "../../hocs/Layout"

const Create = ()=>{
    return(
        <Layout>
            <div className="bg-oscuro max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className=" mt-24 grid justify-items-center text-3xl tracking-tight font-bold text-gray-300 sm:text-4xl">Create your NFT</h2>
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            <div className="max-w-3xl mx-auto">

                <div className="bg-oscuro mt-12">
                    <div className="max-w-7xl mx-auto pb-16 px-4 sm:pb-24 sm:px-6 lg:px-8">
                        <div className="text-center bg-oscuro">
                            <InputForm/>
                        </div>
                    </div>
                </div>
                
            </div>
            </div>
        </Layout>
    )
}

export default Create