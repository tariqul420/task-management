import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import Register from './Register'
import Login from './Login'

function Login_Register() {


  return (
    <TabGroup className={`mx-auto mt-10 flex items-center justify-center flex-col gap-8`}>
      <TabList className={`flex gap-4`}>
        <Tab className="data-[selected]:bg-primary bg-red-500 px-6 py-3 data-[selected]:text-white data-[hover]:underline">Login</Tab>
        <Tab className="data-[selected]:bg-primary bg-red-500 px-6 py-3 data-[selected]:text-white data-[hover]:underline">Register</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Login/>
        </TabPanel>
        <TabPanel>
          <Register/>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}

export default Login_Register