'use client'
import styles from './styles.module.css';
import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { schema, uischema, data } from './lead';
import {
  materialRenderers,
  materialCells,
} from '@jsonforms/material-renderers';
import { useRouter } from 'next/navigation';
import { insertLead } from '@/redux/features/leads-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch, useAppSelector } from '@/redux/store';

const initialData = data;

export default function AssessmentPage() {
  const username = useAppSelector((state) => state.authReducer.value.username);
  const isAdmin = useAppSelector((state) => state.authReducer.value.isAdmin);
  const [data, setData] = useState(initialData);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();


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
    // console.log(data)
    // last check for validation errors??

    // post to some endpoint
    dispatch(insertLead(data))
      .unwrap()
      .then(() => {
        // to navigate to thank you page after success
        router.push('/thanks')
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <header>
        <p>alma</p>
        <h1>Get An Assessment Of Your Immigration Case</h1>
      </header>
      <div>
        <p>Want to understand your visa options?</p>
        <p>Submit the form below and our team of experiencd attorneys will
          review your information and send a preliminary assessment of your case
          based on your goals
        </p>
      </div>
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
    
    </>
  );
}