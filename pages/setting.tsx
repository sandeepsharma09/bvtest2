import { NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { ThirdwebSDK, useStorageUpload } from "@thirdweb-dev/react"
import { useEffect, useState } from "react"
import React from 'react'
import { useAccount } from "wagmi";
import { ConnectWallet, useAddress, useSDK , useContract , useContractRead,useContractWrite  } from "@thirdweb-dev/react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { useRouter } from 'next/router'
import { Center, FormControl, FormLabel,  Input, Select, Stack, Textarea,Link } from '@chakra-ui/react'

const IndexPage: NextPage = () => {
      const tomintcontract:any = useRouter()?.query?.c ?? "noget";
      const contracttype:any = useRouter()?.query?.t ?? "noget";

   const [name, setName] = useState("");
  const [myCar, setMyCar] = useState("nft-collection");
  const [symbol, setSymbol] = useState("");
  const [recipient, setRecipient] = useState("" as any);
  const [percent, setPercent] = useState(0 as any);
    /////////////////////////////////////start////////////
 
  

    // const router = useRouter();
  const address = useAddress();
  // const sdk = useSDK(); 
    const sdk = new ThirdwebSDK("goerli", {
  clientId: "76afcbdf9c0c68d04e5173fc4dc18d80",
});
// "0x22bf39DB3AddE6DB848B20BEE9798009Da03820E"
    const { contract } = useContract(name);
   useEffect(()=>{
setName(tomintcontract);
setMyCar(contracttype);
setRecipient(address);


},[symbol])
console.log('contract', contract);
    // const { data, isLoading } = useContractRead(contract, "name");
    // console.log(data);

    ///////////////////////////////

    const { mutateAsync: setDefaultRoyaltyInfo, isLoading } = useContractWrite(contract, "setDefaultRoyaltyInfo")
// 0x886b2fde5989df11993bdfba55791b6f89959005
  const call = async () => {
    try {
      const data = await setDefaultRoyaltyInfo({ args: [recipient, percent] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

    // platform_fee_recipient: recipient,
    //     platform_fee_basis_points: num,


const handleSubmit = async (event: { preventDefault: () => void }) => {
    //name , symbol type
    event.preventDefault();
    console.log(myCar);
    console.log(name);
    console.log(symbol);
    console.log(recipient);
    console.log(percent);
    
    let num = Number(percent) * 10;
    //  const contractAddress = await sdk.deployer.deployBuiltInContract(
    //   myCar,
    //   {
    //     name: name,
    //     symbol: symbol,
    //     primary_sale_recipient: '0x886b2fde5989df11993bdfba55791b6f89959005',
    //     voting_token_address: '0x886b2fde5989df11993bdfba55791b6f89959005',
    //     royaltyRecipient: '0x886b2fde5989df11993bdfba55791b6f89959005',
    //     royaltyBps: 6,
    //     platform_fee_recipient: '0x886b2fde5989df11993bdfba55791b6f89959005',
    //     platform_fee_basis_points: 7,
    //     description: `My awesome ${myCar} contract`,

    //     recipients: [
    //       {
    //         address:'0x886b2fde5989df11993bdfba55791b6f89959005',
    //         sharesBps: 100,
    //         royaltyRecipient: '0x886b2fde5989df11993bdfba55791b6f89959005',
    //         royaltyBps: 6,
    //       },
    //     ],
    //   }
    // );

    // This is the contract address of the contract you just deployed
    // console.log(contractAddress);
    //   alert(contractAddress);
    // alert(`Succesfully deployed ${contractSelected} at ${contractAddress}`);
    
    // alert(`The name you entered was: ${name}`);

  // const { data, isLoading } = useContractRead(contract, "name");
// console.log(data);
call();
console.log('working');






  }


  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setMyCar(event.target.value)
  }





  
  return (
    <Layout>
      <Center  mt='200px' color=''>
      <Flex
        direction="column"
      align="start"

      css={{ mt: '100px', mb: "4px", textAlign: 'start' }}
      >


        {/* <Link href="list">

<Button
                css={{
                  minWidth: 100,
                  justifyContent: 'center',
                }}
                size="medium"
              >
              Back
              </Button>

  </Link> */}
        {/* <form onSubmit={handleSubmit}>
                <label className="d-none">Contract Type: &nbsp;
        <select  onChange={handleChange} className="form-control">
        <option value="nft-collection">721 </option>
        <option value="edition">1155</option>
      </select> 
      </label>
      <br></br>
      <br></br>
   
      <label>Contract  Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>

       <label className="d-none">Enter  Symbol:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>
      <label>Enter  recipient:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>
      <label>Enter  percent:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={percent}
          onChange={(e) => setPercent(e.target.value)}
        />
      </label>
      <br></br>
      <br></br>
      <br></br>
  

      <Button  type="submit"
                css={{
                  minWidth: 224,
                  justifyContent: 'center',
                }}
                size="large"
              >
                Royalty Set Now
      </Button>
    </form> */}
      


        <form onSubmit={handleSubmit} >
      <FormControl py="50px">

      <Stack spacing={10}>

      <Select placeholder='Select Collection Type'  onChange={handleChange} className="form-control" py='10px'>
      <option value="nft-collection">ERC 721</option>
      <option value="edition"> ERC 1155</option>

      </Select>
      
      <FormLabel>Contract  Address</FormLabel>
      <Input placeholder='Enter collection name' value={name}
          onChange={(e) => setName(e.target.value)} mb='10px'/>
   {/* <label className="d-none">Enter  Symbol:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </label> */}
      <FormLabel>Enter  recipient</FormLabel>
      <Input placeholder='Enter collection symbol' value={recipient}
          onChange={(e) => setRecipient(e.target.value)} mb='10px'/>
      <FormLabel>Enter  percent</FormLabel>
      <Input placeholder='Enter percent' value={percent}
          onChange={(e) => setRecipient(e.target.value)} mb='10px'/>

      {/* <FormLabel>Collection Description</FormLabel>
      <Textarea placeholder='Enter Collection Description' value={recipient}
          onChange={(e) => setPercent(e.target.value)} mb='10px'/> */}

<Button type="submit"
                css={{
                  minWidth: 100,
                  justifyContent: 'center',
                }}
                size="medium"
              >
              Royalty Set Now
              </Button>      
      </Stack>
  
</FormControl>
   </form>


      </Flex>
      </Center>
    </Layout>
  )
}

export default IndexPage
