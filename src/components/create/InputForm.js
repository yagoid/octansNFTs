import {useState, useEffect} from 'react'
import { connect } from 'react-redux'


const InputForm = ({
    octans,
    account,
}) =>{

    useEffect(() => {
    }, [])
    
    const [formData, setFormData] = useState({
        input:''
    })

    const {input} = formData

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = e => {
        e.preventDefault()
        octans.methods.mint(input).send({from:account})
    }

    return(
        <form onSubmit={e=>onSubmit(e)}>
             <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-900 sm:pt-5">
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 sm:mt-px sm:pt-2">
                Token File Location
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  
                  <input
                    type="text"
                    value={input}
                    onChange={e=>onChange(e)}
                    name="input"
                    placeholder="http..."
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"/>
                </div>
              </div>
            </div>
            <button
                type="submit"
                className="float-right mt-5 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Mint
            </button>
        </form>
    )
}

const mapStateToProps = state => ({
    octans: state.ethereum.octans,
    account: state.ethereum.account,
})

export default connect(mapStateToProps, {
}) (InputForm)