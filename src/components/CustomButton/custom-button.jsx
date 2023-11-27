import React from 'react';

import { CustomButtonContainer } from './custom-button.styles';

const CustomButton = ({ children, isLoading, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomButton;
