
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Flex, Text } from '@mantine/core';
import { useEffect, useState } from "react";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { internalEvent } from '../../utils/internalEvent';

type AlertProps = {
  title: string; 
  icon: string;
  message: string;
  time: number;
}

export default function Warning() {
  const [ opened, setOpened ] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<AlertProps>({
    title: 'WARNING',
    icon: 'exclamation-triangle',
    message: 'You are using incompatible settings for this server please change your display settings before the timer runs out',
    time: 10,
  });
  const [opacity, setOpacity] = useState(0);
// if open set opacity to 1
  useEffect(() => {
    if (opened) {
      setTimeout(() => {
        setOpacity(1);
      } , 100)
    } else {
      setOpacity(0);
    }
  } , [opened])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useNuiEvent('NEW_WARNING', (data: any) => {
    setCurrentAlert(data);
    setOpened(true);  
  })

  useNuiEvent('CLOSE_WARNING', () => {
    setOpened(false);
  })

  

  return (
    <>
      {opened ? 
        <Flex
          opacity={opacity}
          h='100vh'
          w='100vw'
          bg='rgba(0, 0, 0, 0.8)'
          justify={'center'}
          align={'center'}
          direction={'column'}
          style={{
            userSelect: 'none',
            transition: 'all 0.5s ease-in-out',
          }}
        >

          <Flex 
            align='center'
            gap='xs'
          >
            <FontAwesomeIcon icon={currentAlert.icon as IconProp} size='2x' color='rgba(255, 0, 0, 0.6)'/>
            <Text
              style={{
                fontFamily: 'Akrobat Bold',
              }}
              size='5vh'
              lh='1vh'
            >{currentAlert.title}</Text>
          </Flex>
          <Timer time={currentAlert.time}/>
          <Text>{currentAlert.message}</Text>
        </Flex>
      : ''}
    </>
  );
}


internalEvent([
  {
    action: 'NEW_WARNING',
    data: {
      title: 'WARNING',
      icon: 'exclamation-triangle',
      message: 'You are using incompatible settings for this server please change your display settings before the timer runs out',
      time: 10,
    }
  }
])

setTimeout(() => {
  internalEvent([
    {
      action: 'CLOSE_WARNING',
    }
  ])
}, 10000);



function Timer(props: {time: number}) {
  const [timeLeft, setTimeLeft] = useState(props.time);
  // format time to 00:00
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  } 

  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft === 0) {
        
        clearInterval(interval);
        return;
      }
      setTimeLeft(timeLeft - 1);  
      
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);


  return (
    <Flex
      align={'center'}
      p='xs'
      gap='xs'
    >
      <FontAwesomeIcon icon='clock' size='1x' color='rgba(255, 255, 255, 0.5)'/>

      <Text
        size='3vh'
        lh='1vh'
        
      >{formatTime(timeLeft)}</Text>
    </Flex>
  )
}