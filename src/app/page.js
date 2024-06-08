'use client'

import InputText from './form/InputText';
import { useState } from 'react';
import DivTag from './DivTag';
import InputSelect from './form/InputSelect';
import { useAuth } from '@/hooks/auth';

export default function Home() {
  const [tab, settab] = useState(1)

  const [network, setnetwork] = useState('')
  const [subType, setsubType] = useState('')
  const [description, setdescription] = useState('')
  const [duration, setduration] = useState('')
  const [cost, setcost] = useState('')
  const [code, setcode] = useState('')

  const [plans, setplans] = useState([])

  const { saveData } = useAuth({
    middleware: 'guest',
  })
  const subTypeables = ['MTN', 'GLO', '9MOBILE', 'AIRTEL']
  const handleSave = async () => {
    const response = await saveData({ plans, network, subType: subTypeables.includes(network) ? network : null })

  }

  const addToList = () => {
    const latestPlan = {
      network,
      subType,
      description: description.trim(),
      duration: Number(duration),
      cost,
      code: code,
    }
    var error;
    for (const key in latestPlan) {
      if (Object.hasOwnProperty.call(latestPlan, key)) {
        const value = latestPlan[key].length ? latestPlan[key].trim() : latestPlan[key];
        if (value == "") {
          error = true
        }
      }
    }
    if (!error) {

      setplans((prev) => {
        const planExist = prev.find(plan => plan.description == latestPlan.description);
        if (!planExist) {
          return [...prev, latestPlan]

        } else {
          return prev
        }
      })
    }
  }

  const handleTab = (tab) => {
    settab(tab)
  }

  return (
    <main>
      <DivTag
        height={"max-content"}
        justify={"center"}
        gap={"1rem"}
      >
        <h1>Data Form</h1>
        <DivTag
          gaf={"column"}
          bgc={"gray"}
          padding={"1px"}
        >
          <DivTag
            handleClick={() => handleTab(1)}
            cursor={"pointer"}
            padding={"1rem 2rem"}
            bgc={tab == 1 ? 'black' : 'tranparent'}
            transition={"background-color 1s"}
          >PLANS</DivTag>
          <DivTag
            handleClick={() => handleTab(2)}
            cursor={"pointer"}
            padding={"1rem 2rem"}
            bgc={tab == 2 ? 'black' : 'tranparent'}
            transition={"background-color 1s"}
          >PLAN_SUBTYPE</DivTag>
          <DivTag
            handleClick={() => handleTab(3)}
            cursor={"pointer"}
            padding={"1rem 2rem"}
            bgc={tab == 3 ? 'black' : 'tranparent'}
            transition={"background-color 1s"}
          >NETWORK_SUBTYPE</DivTag>
          <DivTag
            handleClick={() => handleTab(4)}
            cursor={"pointer"}
            padding={"1rem 2rem"}
            bgc={tab == 4 ? 'black' : 'tranparent'}
            transition={"background-color 1s"}
          >NETWORK_PLAN</DivTag>
        </DivTag>
        {tab == 1 ?
          <DivTag
            gap={"10px"}
            gaf={"column"}
            width={"100%"}
          >
            <DivTag
              height={"max-content"}
              maxheight={"400px"}
              overflow={"auto"}
              position={"relative"}
              border={"1px solid #373737"}
              bradius={"8px"}
              padding={"5px"}
            >
              <DivTag
                position={'sticky'}
                top={"0px"}
                padding={"0 10px"}
                gaf={"column"}
              >
                <h3>Plan's list</h3>
                <button onClick={handleSave}
                  style={{
                    padding: "5px 30px",
                    background: "blue",
                    outline: 'none',
                    border: 'unset',
                    borderRadius: "10px"
                  }}
                >Submit List</button>
              </DivTag>
              <DivTag
                padding={"10px 0"}
                gap={"10px"}
              >
                {plans.length ?
                  plans.map((plan, index) => {
                    return (
                      <DivTag
                        fsize={"11px"}
                        key={index}
                        gaf={"column"}
                      >
                        <DivTag>{plan.network}</DivTag>
                        <DivTag>{plan.description}</DivTag>
                        <DivTag>&#x20A6;{plan.cost}</DivTag>
                        <DivTag>code: {plan.code}</DivTag>
                        <DivTag>{plan.duration}days</DivTag>
                      </DivTag>
                    )
                  })
                  :
                  <DivTag><small><i>List is empty</i></small></DivTag>
                }
              </DivTag>
            </DivTag>
            <DivTag
              gap={"10px"}
              width={"350px"}
              height={"max-content"}
            >
              <InputSelect
                label={"Network"}
                inputBgc
                labelColor={"#9ca3af"}
                valueColor
                padding={''}
                name={"network"}
                id={"network"}
                value={network}
                onChange={(e) => { setnetwork(e.target.value) }}
                tabIndex={1}
                width
              >
                <option value="">-- Please choose --</option>
                <option value="MTN">MTN</option>
                <option value="GLO">GLO</option>
                <option value="9MOBILE">9MOBILE</option>
                <option value="AIRTEL">AIRTEL</option>
                <option value="DSTV">DSTV</option>
                <option value="GOTV">GOTV</option>
                <option value="STARTIMES">STARTIMES</option>
              </InputSelect>
              <InputSelect
                label={"Sub Type"}
                inputBgc
                labelColor={"#9ca3af"}
                valueColor
                padding={''}
                name={"network"}
                id={"network"}
                value={subType}
                onChange={(e) => { setsubType(e.target.value) }}
                tabIndex={2}
                width
              >
                <option value="">-- Please choose --</option>
                <option value="SME">SME</option>
                <option value="GIFTING">GIFTING</option>
                <option value="DIRECT">DIRECT</option>
                <option value="CG_LITE">CG_LITE</option>
              </InputSelect>
              <InputText
                inputType={"text"}
                labelFadeColor={"#9ca3af"}
                // labelColor={"black"}
                // color={"black"}
                tabIndex={3}
                label={"Plan Description"}
                value={description}
                onChange={(e) => { setdescription(e.target.value) }}
              />
              <InputText
                inputType={"text"}
                labelFadeColor={"#9ca3af"}
                // labelColor={"black"}
                // color={"black"}
                tabIndex={4}
                label={"Plan Cost (In naira)"}
                value={cost}
                onChange={(e) => { setcost(e.target.value) }}
              />
              <InputText
                inputType={"text"}
                labelFadeColor={"#9ca3af"}
                // labelColor={"black"}
                // color={"black"}
                tabIndex={5}
                label={"Plan Duration (In days)"}
                value={duration}
                onChange={(e) => { setduration(e.target.value) }}
              />
              <InputText
                inputType={"text"}
                labelFadeColor={"#9ca3af"}
                // labelColor={"black"}
                // color={"black"}
                tabIndex={6}
                label={"Plan Code"}
                value={code}
                onChange={(e) => { setcode(e.target.value) }}
              />
              <DivTag
                justify={"center"}
                justifyself={"center"}
                bgc={"#22530f"}
              >
                <button onClick={addToList}
                  style={{ padding: "5px 30px", background: "inherit" }}
                >Add To List</button>
              </DivTag>
            </DivTag>

          </DivTag>
          : tab == 2 ?
            <DivTag>
              <h1>Tab TWO</h1>
            </DivTag>
            : tab == 3 ?
              <DivTag>
                <h1>Tab THREE</h1>
              </DivTag>
              :
              <DivTag>
                <h1>Tab FOUR</h1>
              </DivTag>

        }
      </DivTag>
    </main>
  )
}
