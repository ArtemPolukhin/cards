import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchData = createAsyncThunk(
  'fetchData',
  async (limit) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_limit=${limit}`
    )
    
    const result = await response.json()

    return result.map((item) => {
      return {
        ...item, 
        liked: false,
      }
    })
  }
)

export const dataSlice = createSlice({
  name: 'data',
  initialState: {
    cards: [],
  },
  reducers: {
    hide(state, action) {
      state.cards = state.cards.filter((card) => {
        return card.id !== parseInt(action.payload)
      })
    },
    like(state,  action) {
      state.cards = state.cards.map((card) => {
        return { 
          ...card, 
          liked: card.id === parseInt(action.payload) ? !card.liked : card.liked
        }
      })
    },
  },
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      state.cards = action.payload
    }
  }
})

export const { hide, like } = dataSlice.actions

export default dataSlice.reducer