import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const LEADS_URL = 'http://localhost:3000/api/leads'

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  url: string;
  help: string;
  status: 'PENDING' | 'REACHED_OUT';
  visas: string[]
}

type InitialState = {
  value: LeadsState;
}

type LeadsState = {
  data: Lead[];
  status: string;
  error: string;
}

const initialState = {
  value: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: '',
    data: []
  } as LeadsState
} as InitialState

export const fetchLeads = createAsyncThunk('leads/fetchLeads', async () => {
    const response = await axios.get(LEADS_URL);
    return response.data;
})

export const insertLead = createAsyncThunk('leads/insertLead', async (lead) => {
  debugger;
  const response = await axios.post(LEADS_URL, lead);
  lead.status = 'pending';
  return lead;
})

export const reachOut = createAsyncThunk('leads/reachOut', async (id:number) => {
  const response = await axios.put(`${LEADS_URL}/${id}`);
  return { id };
})

export const leads = createSlice({
  name: 'leads',
  initialState,
  reducers: {
    addLead: (state, action) => {
      let lead = action.payload; // will be a lead obj
      state.value.data = [...state.value.data, lead]
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLeads.pending, (state, action) => {
        state.value.status = 'loading';
      })
      .addCase(fetchLeads.fulfilled, (state, action) => {
        state.value.status = 'succeeded';
        state.value.data = action.payload;
      })
      .addCase(fetchLeads.rejected, (state, action) => {
        state.value.status = 'failed';
        state.value.error = action.error.message || '';
      })
      .addCase(insertLead.fulfilled, (state, action) => {
        state.value.data = [...state.value.data, action.payload]
      })
      .addCase(reachOut.fulfilled, (state, action) => {
        let {id} = action.payload;
        const lead = state.value.data.find(lead => lead.id === id);
        if (lead) {
          lead.status = 'reached out';
        }
      })
  }
})

export const { addLead} = leads.actions;
export default leads.reducer;


