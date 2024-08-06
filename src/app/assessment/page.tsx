'use client'
import styles from './styles.module.css';
import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';

import { schema, uischema, data } from './lead';
// import { person } from '@jsonforms/examples';

import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';

// import { ErrorObject } from 'ajv'// doing this later....

// const schema = person.schema;
// const uischema = person.uischema;
// const initialData = person.data;

const initialData = data;




export default function AssessmentPage() {
  const [data, setData] = useState(initialData);


  function handleChange({data, errors}: {data: any, errors: any}) {

    // validate
    if (errors.length) {
      console.log('errors!!!')
      console.log(errors)
    } else {
      console.log('thedata: ')
      console.log(data)

      // validation successfull... set the data
      setData(data);

    }


  }

  function handleFileChange(e) {
    setData(prev => {
      let copy = {...prev};
      copy.resume = e.target.files[0];
      return copy;
    })
  }

  function handleSubmit() {
    console.log(data)
    // post to some endpoint
    // if error, an alert maybe
    // if successful.... navigate to thank you???
  }

  return (
    <>
      <h1>ASSESSMENT PAGE</h1>
      <JsonForms 
        schema = {schema}
        uischema = {uischema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={handleChange}
      />

      {/* TODO.... custom renderer for adding this in JSONFORMS?? */}

      <div className={styles.uploadResume}>
        <label htmlFor='resume'>Upload your resume</label>
        <input 
          id='resume'
          type="file"
          onChange={handleFileChange}
        />
      </div>

      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>


      <p>DEBUG</p>
      {JSON.stringify(data)}
    
    </>
  );
}