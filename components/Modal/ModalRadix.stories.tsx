import { Meta, StoryObj } from "@storybook/react"
import { ModalRadix, ModalRadixProps } from "./ModalRadix"
import { Button } from "../Button/Button"
import { useState } from "react"

const meta = {
  component: ModalRadix,
  tags: ['autodocs'],
} satisfies Meta<typeof ModalRadix>

export default meta
type Story = StoryObj<typeof ModalRadix>

//Function Render 
function Render (args: ModalRadixProps) {
  const [showModal, setShowModal] = useState(false)

  const openModalHandler = () => {
  setShowModal(true)
}

  const closeModalHandler = () => {
  setShowModal(false)
}
return (
  <>
  <Button variant={"primary"} onClick={openModalHandler}>
    Open modal
  </Button>
  <ModalRadix {...args} open={showModal} onClose={closeModalHandler}/>
</>
)
}

/** BaseModal*/
export const BaseModal: Story = {
    args: {
        modalTitle: 'Modal title', 
        children: <div>lorem input</div>
    },
    render: Render
  }
   

/** SmallModal*/
export const SmallModal: Story = {
  args: {
      ...BaseModal.args, 
      size: 'sm'
  },
  render: Render
}
 