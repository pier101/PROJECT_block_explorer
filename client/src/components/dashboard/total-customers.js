import { Avatar, Box, Card, CardContent, Grid, Typography,Button,TextField } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import { useState,useEffect } from 'react';
import axios from 'axios';


export const TotalCustomers = (props) => {
  const [nodeChech,setNodeCheck] = useState(0)
  const [inputPort,setInputPort] = useState([])
  const [connectPort,setConnectPort] = useState()
  
  const addNode = async()=>{
    await axios.post("http://localhost:3001/addPeers", {url: `ws://localhost:${inputPort}`}).then(res=>{
      alert(res.data.msg)
      setConnectPort(inputPort=>[...inputPort,res.data.port])

    })
  }

  const handlePort = (e)=>{
      setInputPort(e.target.value)
  }

  useEffect(() => {
      const onNode = async()=>{
        await axios.get('http://localhost:3001/chenkOn').then(res=>{
          if (res.data ==true) {
            setNodeCheck(nodeChech+1)
          }

        }).catch(()=>{console.log(" 서버가 열려있지 않습니다.")})
        
        await axios.get('http://localhost:3002/chenkOn').then(res=>{
          if (res.data ==true) {
            setNodeCheck(nodeChech+1)
          }
        }).catch(()=>{console.log(" 서버가 열려있지 않습니다.")})

        await axios.get('http://localhost:3003/chenkOn').then(res=>{
          if (res.data ==true) {
            setNodeCheck(nodeChech+1)
          }
        }).catch(()=>{console.log(" 서버가 열려있지 않습니다.")})
      }
      onNode()
  }, [])
  
  return (
  <Card {...props}>
    <CardContent>
      <Grid container sx={{justifyContent:'space-around'}}>
        <Box>
        <TextField id="outlined-basic" variant="outlined" size="small" onChange={handlePort}/>
          <Button variant='contained' onClick={addNode}>
            통신 요청
          </Button>
        </Box>
        <Box>
        {connectPort}
        </Box>

      </Grid>
      {/* <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            총 노드수
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {nodeChech}노드
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid> */}
      {/* <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          25%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box> */}
    </CardContent>
  </Card>
);
}
