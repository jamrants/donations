import React from 'react';
import { Box, Image, Text, PseudoBox } from '@chakra-ui/core';

const DonationCard = ({ imageURL, name, amount, donationCurrency, profits, percent, locale }) => {
  amount = parseInt(amount);
  profits = parseFloat(profits)
  return (
    <PseudoBox
      padding={['12px', null, '16px', '24px', '30px']}
      backgroundColor='darkless'
      color='snow'
      borderRadius='10px'
      boxShadow='rgba(0, 0, 0, 0.125) 0px 4px 8px;'
      transition='all .2s ease-in-out'
      _hover={{ transform: 'scale(1.05)' }}
      key={name + 'Donation Stats'}
    >
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        <Image src={imageURL} rounded='full' w={['50px', null, '60px', '70px', '80px']} h={['50px', null, '60px', '70px', '80px']} objectFit='cover'/>
        <Box ml={'8px', null, null, null, '16px'}>
          <Text
            mb={['2px', null, null, '4px', '8px']}
            mt='2px'
            fontWeight='900'
            fontSize={['20px', null, '24px', '28px', '32px']}
            lineHeight={['20px', null, '24px', '28px', '32px']}
            isTruncated
            maxWidth={['300px', null, null, null, '390px']}
          >
            {name}
          </Text>
          <Text
            fontWeight='600'
            color='smoke'
            fontSize={['16px', null, '20px', '22px', '24px']}
            lineHeight={['16px', null, '20px', '22px', '24px']}
          
          >
            <PseudoBox
              as='span'
              borderBottom='1px solid #6C6C72'
            >
              ${(amount * 1000).toLocaleString('en-us')} 
            </PseudoBox>
            {' '}
            <Box 
              as='span'
              fontSize={['12px', null, '14px', '15px', '16px']}
            >
              {donationCurrency}
            </Box>
          </Text>
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        mt={['24px', null, null, null, '32px']}
      >
        <Box mr={['32px','32px', null, '24px', '32px']}>
          <Text
            fontWeight='900'
            fontSize={['20px', null, '24px', '28px', '32px']}
            lineHeight={['20px', null, '24px', '28px', '32px']}            
          >
            {(percent * 100).toFixed(3)}%
          </Text>
          <Text
            color='smoke'
            fontSize={['12px', null, '14px', '15px', '16px']}     
            fontWeight='600'     
          >
            of 
            {' '}
            <PseudoBox
              as='span'
              borderBottom='1px solid #6C6C72'          
            >
              profits
            </PseudoBox>
            {' '}
            donated
          </Text>
        </Box>
        <Box>
          <Text
            fontWeight='900'
            fontSize={['20px', null, '24px', '28px', '32px']}
            lineHeight={['20px', null, '24px', '28px', '32px']}          
          >
            {(locale.Median_Household_Income * percent).toLocaleString(locale, { style: 'currency', currency: locale.Currency})}
          </Text>
          <Text
            color='smoke'
            fontSize={['12px', null, '14px', '15px', '16px']}     
            fontWeight='600'             
          >
            adjusted to 
            {' '}
            <PseudoBox
              as='span'
              borderBottom='1px solid #6C6C72'
            >
              avg. income
            </PseudoBox>
          </Text>
        </Box>
      </Box>
    </PseudoBox>
  )
}

export default DonationCard;