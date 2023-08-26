import { NextPage } from 'next'
import { Text, Flex, Box, Button } from 'components/primitives'
import Layout from 'components/Layout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import { ThirdwebSDK, useStorageUpload } from "@thirdweb-dev/react"
import { SetStateAction, useEffect, useState } from "react"
import React from 'react'
import { useAccount } from "wagmi";
import { ConnectWallet, useAddress, useSDK , useContract , useContractRead,useContractWrite  } from "@thirdweb-dev/react";
import { AiOutlineClose, AiOutlineCloudUpload } from "react-icons/ai";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Center, FormControl, FormLabel, Input, Select, Stack, Textarea } from '@chakra-ui/react'

const Home: NextPage = () => {

    //  const router = useRouter()
  // const {tomintcontract} = router.query
      const tomintcontract:any = useRouter()?.query?.c ?? "noget";
      const contracttype:any = useRouter()?.query?.t ?? "noget";

//  console.log('contracttype',contracttype);
// console.log('working');



	const [file, setFile] = useState<File | null>(null)
    const [percent, setPercent] = useState("");
      const [myCar, setMyCar] = useState('');
    const [image, setImage] = useState("");
  const [recipient, setRecipient] = useState("" as any);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [uri, setUri] = useState("");
  const [_tokenId, set_tokenId] = useState("115792089237316195423570985008687907853269984665640564039457584007913129639935");
  const [_amount, set_amount] = useState("");
  const [displayv, set_displayv] = useState("none");


  
//   0xc6Adc341f0e2693803021DFc6744DcCe6cab7dab contractid
// 0x1A409E1473C6a92E45DbF7363C1532D5D3A1a3dF myid

   const [contractName, setcontractName] = useState('');
// setcontractName(tomintcontract);
// setMyCar(contracttype);
      //  setcontractName(tomintcontract);
 
// setcontractName();
   // const router = useRouter();
    const { address } = useAccount();
  // const sdk = useSDK();
  const sdk = new ThirdwebSDK("goerli", {
  clientId: "76afcbdf9c0c68d04e5173fc4dc18d80",
});
// "0x22bf39DB3AddE6DB848B20BEE9798009Da03820E"
// const tomintcontract = 
    const { contract } = useContract(contractName);
console.log('contract', contract);
const metadata = {
    "name": name,
    "description": description,
    "image": image,
    "external_url": "",
    "attributes": [
        {
            "trait_type": "Membership",
            "value": "bluevinci"
        }
    ]
};

    const { mutateAsync: mintTo, isLoading } = useContractWrite(contract, "mintTo")

  const call = async () => {


// setUri('https://bafybeiacfejonfjuk5vdbdum4cxsc3j7sjebkjs6imydsrl6p3sofx4gz4.ipfs.dweb.link/');

    
    try {
      console.warn('myCar',myCar);

      if(myCar == 'nft-collection'){

   
      const data = await mintTo({ args: [recipient, uri] });
      console.info("contract call successs", data);
      alert('success');
   }else{



    // let id = Number(_tokenId);
    let amount = Number(_amount);
    // const data = await contract.call("mintTo", [recipient, _tokenId, uri, _amount])
         const data = await mintTo({ args: [recipient, _tokenId, uri, amount] });

   }


    } catch (err) {
      console.error("contract call failure", err);
      alert('error');
    }
  }

const call1 = async() =>{

    console.log('image',image);

    const uploadUrl = await upload({
			data: [metadata],
			options: {
				uploadWithGatewayUrl: true,
				uploadWithoutDirectory: true,
			},
		})
        let newver = uploadUrl.toString();
        console.log('url', newver)
        setUri(newver);

}





useEffect(()=>{
setcontractName(tomintcontract);
setMyCar(contracttype);
setRecipient(address);
    if(image){


call1()




    if(image && recipient && uri){
        console.log('uri called')
        console.log('percentinside',percent)
        console.log('recipientinside',recipient)

    call();  
     console.log('call done');
       setImage('');
    }
    }


},[image,uri])


	const { mutateAsync: upload } = useStorageUpload()


        const uploadToIpfs = async (event: { preventDefault: () => void }) => {
    //name , symbol type
    event.preventDefault();
		const uploadUrl = await upload({
			data: [file],
			options: {
				uploadWithGatewayUrl: true,
				uploadWithoutDirectory: true,
			},
		})
    // setFile(uploadUrl);
    let newver = uploadUrl.toString();
    console.log('newver',newver);
    setImage(newver);
	// 	console.log("Uploaded to IPFS: " + uploadUrl)
    //  console.log('recipient',recipient)
    //  console.log('percent',percent)
    // //  setTimeout(function(){
    //       console.log('percent2',percent)
       
    //     }, 4000);
console.log('working');


	}
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setMyCar(event.target.value);
    if(event.target.value == 'nft-collection'){
      set_displayv('none');
    }else{
      set_displayv('block');
    }
    
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
              
                }}
                size="medium"
              >
              Back
              </Button>
              </Link> */}
        
		<div>
            {/* <form onSubmit={uploadToIpfs}>

              
              <label>Contract Type:&nbsp;
            
            
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
          value={contractName}
          onChange={(e) => setcontractName(e.target.value)}
        />
      </label>
      <br></br>
      <br></br> 
                 
      <label style={{display:'none'}}> TokenId:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={_tokenId}
          onChange={(e) => set_tokenId(e.target.value)}
        />
         <br/>
      <br/>
      </label>
     
      <label style={{display:displayv}}>Amount :&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={_amount}
          onChange={(e) => set_amount(e.target.value)}
        />
        <br/>
      <br/>
      </label>
      
      <label>Enter  Name:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br/>
      <br/>
      
      <label>Enter  Discription:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <br/>
      <br/>
      <label>Enter your  address:&nbsp;&nbsp;&nbsp;
        <input 
          type="text" 
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
      </label>

      <br></br>
      <br></br>
			<input
				type="file"
				onChange={(e) => {
					if (e.target.files) {
						setFile(e.target.files[0])
					}
				}}
			/>
            <br></br>
      <br></br>
			<Button  type="submit"
                css={{
                  minWidth: 224,
                  justifyContent: 'center',
                }}
                size="large"
              >
                Mint Now
      </Button>
            </form> */}



              <form onSubmit={uploadToIpfs} >
      <FormControl py="50px">

      <Stack spacing={10}>

      <Select placeholder='Select Collection Type'  onChange={handleChange} className="form-control" py='10px'>

      

      {contracttype == 'nft-collection' &&
        <>
        <option value="nft-collection" selected>ERC 721</option>
        <option value="edition"> ERC 1155</option>
        </>
        }
        {contracttype == 'edition' &&
        <>
           <option value="nft-collection" >ERC 721</option>
        <option value="edition" selected> ERC 1155</option>
        </>
        }

      </Select>
      
      <FormLabel>Contract  Address</FormLabel>
      <Input placeholder='Enter Contract  Address' value={contractName}
          onChange={(e) => setcontractName(e.target.value)} mb='10px'/>
      <FormLabel  style={{display:displayv}}>Amount</FormLabel>
      <Input  style={{display:displayv}} placeholder='Enter Amount' value={_amount}
          onChange={(e) => setcontractName(e.target.value)} mb='10px'/>
      <FormLabel>Enter  Name</FormLabel>
      <Input placeholder='Enter Name' value={name}
          onChange={(e) => setName(e.target.value)} mb='10px'/>
 
 
      <FormLabel>Enter  your  address</FormLabel>
      <Input placeholder='Enter your  address' value={recipient}
          onChange={(e) => setRecipient(e.target.value)} mb='10px'/>

                <FormLabel>upload Image</FormLabel>
                <Input
				type="file"
				onChange={(e) => {
					if (e.target.files) {
						setFile(e.target.files[0])
					}
				}}
			/>


      <FormLabel  style={{display:'none'}}>TokenId</FormLabel>
      <Input style={{display:'none'}} placeholder='Enter TokenId' value={_tokenId}
          onChange={(e) => set_tokenId(e.target.value)} mb='10px'/>

      <FormLabel>Collection Description</FormLabel>
      <Textarea placeholder='Enter Collection Description' value={description}
          onChange={(e) => setDescription(e.target.value)} mb='10px'/>

<Button type="submit"
                css={{
                  minWidth: 100,
                  justifyContent: 'center',
                }}
                size="medium"
              >
              Mint Now
              </Button>      
      </Stack>
  
</FormControl>
   </form>
		</div>
        </Flex>
        </Center>
        </Layout>
	)
}

export default Home
 