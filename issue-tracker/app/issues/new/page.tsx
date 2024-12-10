'use client'

import { TextField, TextArea, Button} from '@radix-ui/themes';
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder='Title'/>                     
 
		<TextArea size="3" placeholder="Descritpion of issue"/>
        <Button>Submit New Issue</Button>
    </div>

  )
}

export default NewIssuePage