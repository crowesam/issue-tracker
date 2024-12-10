'use client'

import { TextField, Button} from '@radix-ui/themes';
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder='Title'/>                     
 
		<SimpleMDE size="3" placeholder="Descritpion of issue"/>
        <Button>Submit New Issue</Button>
    </div>

  )
}

export default NewIssuePage