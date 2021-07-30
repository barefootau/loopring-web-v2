import { WithTranslation, withTranslation } from 'react-i18next';
import { Modal } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@emotion/react';
import { Box } from '@material-ui/core/';
import { ModalCloseButton, ModalContentStyled, ModalAccountProps } from '../../../index';

export const ModalAccount = withTranslation('common', {withRef: true})((
    {
        open,
        onClose,
        step,
        panelList,
        ...rest
    }: ModalAccountProps & WithTranslation) => {
    const theme = useTheme();


    return <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >

        <ModalContentStyled style={{boxShadow: '24'}}>
            <ModalCloseButton onClose={onClose} {...rest} />
            <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={step}>
                <ModalCloseButton onClose={onClose} {...rest} />
                {panelList.map((panel,index)=>{
                    return <Box key={index}>
                        {panel}
                    </Box>
                })}
            </SwipeableViews>
        </ModalContentStyled>
    </Modal>
})
