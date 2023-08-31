import { SetStateAction, useEffect, useState } from "react";
import { NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives';

import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { ChainId, ThirdwebProvider , useContract , ConnectWallet, useAddress, useSDK, ThirdwebSDK} from "@thirdweb-dev/react";
import { useAccount } from "wagmi";
const activeChain = "mumbai"; 
import supabase from "../config/supabaseClient"
import { Center, Square, Circle, Link } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'

const IndexPage: NextPage = () => {

   
       const [name, setName] = useState("");
  const [myCar, setMyCar] = useState("nft-collection");
  const [symbol, setSymbol] = useState("");
  const [recipient, setRecipient] = useState("");
  const [percent, setPercent] = useState(0);
    /////////////////////////////////////start////////////
    // const router = useRouter();
    const { address } = useAccount();
//   const sdk = new ThirdwebSDK("goerli", {
//   clientId: "76afcbdf9c0c68d04e5173fc4dc18d80",
// });
  const sdk = useSDK();
    // Function to deploy the proxy contract
 


    // platform_fee_recipient: recipient,
    //     platform_fee_basis_points: num,


const handleSubmit = async (event: { preventDefault: () => void; }) => {
  
    if (!address || !sdk) {
        alert(`address: ${address}`);
      return;
    }


    //name , symbol type
    event.preventDefault();
    console.log(myCar);
    console.log(name);
    console.log(symbol);
    console.log(recipient);
    console.log(percent);
    let num = Number(percent);
    const type =  myCar; 
const discrption =  recipient; 
const msg =  'msg'; 
     const contractAddress = await sdk.deployer.deployBuiltInContract(
      myCar,
      {
        name: name,
        symbol: symbol,
        primary_sale_recipient: address,
        voting_token_address: address,
        description: recipient,

        recipients: [
          {
            address:address,
            sharesBps: 100
          },
        ],
      }
    );

    // This is the contract address of the contract you just deployed
    console.log(contractAddress);
      alert(contractAddress);

      const contract =  contractAddress;
      if(contractAddress){
         const { data, error } = await supabase
      .from('deploy')
      .insert([{  type, name, symbol, discrption, msg,address ,contract }])

    if (error) {
      console.log(error)
      console.log('error')

    }else{
      console.log('success');
    }

      }
    // alert(`Succesfully deployed ${contractSelected} at ${contractAddress}`);
    
    // alert(`The name you entered was: ${name}`);
  }


  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMyCar(event.target.value)
  }




  return (
    
         
    <Layout>

<Center   color=''>

 <Flex
      direction="column"
      align="center"

      css={{ mt:"100px" , mb: "4px", textAlign: 'start' }}
      >   


<Heading  fontSize='22px'>
Deploy Collection         </Heading>
      
      {/* <Heading size='lg' fontSize='30px'>Deploy Collection</Heading> */}

    <form onSubmit={handleSubmit} >
      <FormControl py="50px">

      <Stack spacing={10}>

      <Select placeholder='Select Collection Type'  onChange={handleChange} className="form-control" py='10px'>
      <option value="nft-collection">ERC 721</option>
      <option value="edition"> ERC 1155</option>

      </Select>
      
      <FormLabel>Collection Name</FormLabel>
      <Input placeholder='Enter collection name' value={name}
          onChange={(e) => setName(e.target.value)} mb='10px'/>

      <FormLabel>Collection Symbol</FormLabel>
      <Input placeholder='Enter collection symbol' value={symbol}
          onChange={(e) => setSymbol(e.target.value)} mb='10px'/>

      <FormLabel>Collection Description</FormLabel>
      <Textarea  rows={4} placeholder='Enter Collection Description' value={recipient}
          onChange={(e) => setRecipient(e.target.value)} mb='10px'/>

<Button type="submit"
                css={{
                  minWidth: 100,
                  justifyContent: 'center',
                }}
                size="medium"
              >
              Deploy Contract
              </Button>      
      </Stack>
  
</FormControl>
   </form>

      <div>
       <p> Note  -  </p>

  <p>We use Thirdweb Contracts for for creating Collections. The contracts are open-source, audited, optimised to keep gas fee low and delpyed using proxy server</p>

<p>Contract Source- <Link className="linkmain link" target="_blank" href="https://github.com/thirdweb-dev/contracts">https://github.com/thirdweb-dev/contracts</Link> </p>
      </div>

          {/* <form onSubmit={handleSubmit}>
            
<label>Contract Type:
            
            
                <select  onChange={handleChange} className="form-control">
        <option value="nft-collection">721 </option>
        <option value="edition">1155</option>
      </select> 
   </label> 

      <br></br>
      <br></br>
   
      <label>Enter  name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>

       <label>Enter  Symbol:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>
      <label>Enter  Discription:&nbsp;&nbsp;&nbsp;
        <textarea 
       
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>
    
      <br></br>
      <br></br>
      <br></br>
  


      <Button type="submit"
                css={{
                  minWidth: 224,
                  justifyContent: 'center',
                }}
                size="large"
              >
                Deploy Now
              </Button>
              
    </form> */}

      </Flex>
      </Center>
          </Layout>

  )
}

export default IndexPage
