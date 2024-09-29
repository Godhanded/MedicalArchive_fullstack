import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { address, abi } from "../../constants";
import { useContractWrite,useWatchContractEvent } from "wagmi";
import { useState } from "react";
import { useCallback } from 'react';
import style from "./register.module.scss";
import { 
    Transaction, 
    TransactionButton,
    TransactionSponsor,
    TransactionStatus,
    TransactionStatusAction,
    TransactionStatusLabel,
  } from '@coinbase/onchainkit/transaction'; 

const RegisterPatient = () => {
    const [patientName, setPatientName] = useState("");
    const [id,setId]=useState({id:"",isWaiting:false});
    const { data, isLoading, writeAsync } = useContractWrite({
        mode: "recklesslyUnprepared",
        address: address[84532].address,
        chainId: 84532,
        abi: abi,
        args: [patientName],
        functionName: "addPatient",
        onSettled(data, error) {
            console.log('Settled', { data, error })
            setId(prev=>({...prev,isWaiting:true}))
        },
    });
    const contract=[{
        address: address[84532].address,
        abi: abi,
        args: [patientName],
        functionName: "addPatient",
    }]
    useWatchContractEvent({
        address: address[84532].address,
        abi: abi,
        eventName: 'PatientAdded',
        listener(node, label, owner) {
          console.log({"1":node, "2":label, "3":owner})
          setId({isWaiting:false,id:label})
        },
      })

      const handleOnStatus = useCallback((status) => {
        console.log('LifecycleStatus', status);
        if(status.statusName==="success"){
            console.log(status.statusData.transactionReceipts[0].logs[1].data)
            const logs=status.statusData.transactionReceipts[0].logs[1].data
            setId({isWaiting:false,id:logs??"err"})
        }
      }, []);

    return (
        <section className={style.send}>
            <h3>register new patient</h3>
            <small>Patient ID will be given after registration</small>
            <form className={style.form}>
                <input
                    name="name"
                    value={patientName}
                    onChange={(event) => setPatientName(event.target.value)}
                    type="text"
                    placeholder="Patients Name"
                />

<Transaction
      chainId={84532}
      contracts={contract}
      onStatus={handleOnStatus}
      
    >
      <TransactionButton text="Register" />
      <TransactionSponsor />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
                {/* <button
                    disabled={!writeAsync}
                    onClick={async (event) => {
                        event.preventDefault();
                        await writeAsync();
                        
                    
                    }}
                >
                    register
                    <span>
                        {isLoading && (
                            <FontAwesomeIcon icon={faSpinner} className={style.spinner} />
                        )}
                    </span>
                </button> */}
                <div>
                    <span>patient ID: {id.id && `${parseInt(id.id)}`}</span>
                </div>
            </form>
        </section>
    );
};

export default RegisterPatient;
