import {
    LOAD_WEB3_SUCCESS,
    LOAD_WEB3_FAIL,
    LOAD_BLOCKCHAIN_DATA_SUCCESS,
    LOAD_BLOCKCHAIN_DATA_FAIL,
    LOAD_OCTANS_CONTRACT_SUCCESS,
    LOAD_OCTANS_CONTRACT_FAIL,
    LOAD_NFT_TOTALSUPPLY_SUCCESS,
    LOAD_NFT_TOTALSUPPLY_FAIL,
    LOAD_OCTANS_NFTS_SUCCESS,
    LOAD_OCTANS_NFTS_FAIL,
} from './types'
import Web3 from 'web3'

import Octans from '../../abis/Octans.json'

export const setLoadWeb3 = () => async dispatch => {
    if(window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
        dispatch({
            type: LOAD_WEB3_SUCCESS,
        })
    } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
        dispatch({
            type: LOAD_WEB3_SUCCESS,
        })
    } else {
        dispatch({
            type: LOAD_WEB3_FAIL,
        })
    }
}


export const loadBlockchainData = () => async dispatch => {
    if(window.web3){
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        dispatch({
            type: LOAD_BLOCKCHAIN_DATA_SUCCESS,
            payload:accounts[0]
        })

        const networkId = await web3.eth.net.getId()

        // Cargar contrato Octans
        const octansData = Octans.networks[networkId]
        if(octansData){
            const abi = Octans.abi
            const address = octansData.address
            const contract = new web3.eth.Contract(abi, address)
            dispatch({
                type:LOAD_OCTANS_CONTRACT_SUCCESS,
                payload:contract
            })

            const totalSupply = await contract.methods.totalSupply().call()
            if(totalSupply > 0){
                dispatch({
                    type: LOAD_NFT_TOTALSUPPLY_SUCCESS,
                    payload: totalSupply
                })
                let nfts = []
                for(let i = 1; i <= totalSupply; i++) {
                    const Octans = await contract.methods.OctansNFTS(i - 1).call()
                    nfts.push(Octans)
                    dispatch({
                        type: LOAD_OCTANS_NFTS_SUCCESS,
                        payload: nfts
                    })
                }

            } else {
                dispatch({
                    type: LOAD_NFT_TOTALSUPPLY_FAIL,
                })
                dispatch({
                    type: LOAD_OCTANS_NFTS_FAIL,
                })
            }

            
        }
    } else {
        dispatch({
            type: LOAD_BLOCKCHAIN_DATA_FAIL,
            payload:'Account not connected'
        })
        dispatch({
            type:LOAD_OCTANS_CONTRACT_FAIL,
        })
    }
}