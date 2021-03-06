import React from 'react'
import axios from 'axios'
import debounce from 'lodash/debounce'
import Container from '@mui/material/Container'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography  from '@mui/material/Typography'
import InputAdornment  from '@mui/material/InputAdornment'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import ScoreBar from './ScoreBar'
import ScoreText from './ScoreText'
import Copyright from './Copyright'
import { DEBOUNCE_TIME, PW_CHECK_URL } from './constant'

const App = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const [pwValue, setPwValue] = React.useState('')
  const [checkResult, setCheckResult] = React.useState({})
  const [checkLoading, setCheckLoading] = React.useState(false)
  const [checkError, setCheckError] = React.useState(false)

  const check = (value) => {
    setCheckLoading(true)
    setCheckResult({})
    setCheckError(false)
    if(value === ''){
      setCheckLoading(false)
    }
    else {
      axios.post(PW_CHECK_URL, {
        password: value
      })
      .then((response) => {
        setCheckResult(response.data)
        setCheckLoading(false)
      })
      .catch(() => {
        setCheckResult({})
        setCheckLoading(false)
        setCheckError(true)
      })
    }
  }

  const debouncedInput = React.useMemo(() => debounce((value) => check(value), DEBOUNCE_TIME), [])
  const handleTogglePasswordVisibility = () => setShowPassword(prev => !prev)
  const handlePasswordInput = (event) => {
    setPwValue(event.target.value)
    debouncedInput(event.target.value)
  }

  return (
    <Container maxWidth="sm">
      <Box
          sx={{
            marginTop: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <InputLabel htmlFor="pw-input" sx={{padding: 8, fontSize: '32px'}}>
          Is your password strong enough?
        </InputLabel>
        <TextField
          variant="outlined"
          type={showPassword ? "text" : "password"}
          onChange={handlePasswordInput}
          sx={{border: '1px solid'}}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Typography
                  sx={{cursor: 'pointer'}}
                  variant="caption"
                  onClick={handleTogglePasswordVisibility}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </Typography>
              </InputAdornment>
            )
          }}
          id="pw-input"
          value={pwValue}
          fullWidth
        />
        <ScoreBar score={checkResult?.score ?? -1} />
        <Box
          sx={{
            paddingTop: 8,
            paddingBottom: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {checkLoading && <CircularProgress />}
          {!checkLoading && !checkError && Object.keys(checkResult).length > 0 &&
            <>
              <ScoreText score={checkResult?.score ?? 0} />
              <Typography paragraph gutterBottom>
                It will take {checkResult?.guessTimeString} to guess your password. {checkResult?.warning}
              </Typography>
              {
                checkResult.suggestions?.map(each => <Typography paragraph sx={{fontWeight: 'bold'}}>{each}</Typography>)
              }
            </>
          }
          {checkError && <Typography>An error occurred</Typography>}
        </Box>
        <Copyright/>
      </Box>
    </Container>
  );  
} 

export default App
