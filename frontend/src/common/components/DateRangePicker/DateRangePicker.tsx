import * as React from 'react';
import styled from 'styled-components';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {FlexContainer, Row} from '../../styles/Styles';
import {colors} from '../../Colors';
import { format, isEqual, isValid } from 'date-fns';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendar, faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import {DateRange} from 'react-date-range';
import { InputBox } from '../InputBox/InputBox';
import { Button } from '../Button/Button';

const Container = styled(FlexContainer)`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    z-index: 9999;
`;

const ControlContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 40px;
    box-sizing: border-box;

`;

const Control = styled.div`
    display: flex;
    flex-direction: row;
    width: ${({width}: {width: number}) => (width ? `${width}px` : '100%')};
    color: ${colors.BLACK[100]};
    border-radius: 0px 5px 5px 0px;
    box-sizing: border-box;
    border: solid 1px ${colors.GREY[700]};
    font-weight: 100;
    font-size: 16px;
    height: 100%;
    align-items: center;
    justify-content: center;
`;

const Icon = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    padding: 0 16px;
    border-radius: 5px 0px 0px 5px;
    border-top: solid 1px ${colors.GREY[700]};
    border-left: solid 1px ${colors.GREY[700]};
    border-bottom: solid 1px ${colors.GREY[700]};
    box-sizing: border-box;
`;

const RightArrow = styled.span`
    padding: 0;
`;

const CalanderContainer = styled.div`
    display: flex;
    flex-direction: column;
    top: 48px;
    left: 0;
    background: #fff;
    border: solid 1px ${colors.GREY[700]};

    .rdrDayNumber{
        position: absolute;
        display: flex;
    }
`;

const DISPLAY_DATE_FORMAT = "yyyy-MMM-dd";

interface Props {
    startDate: Date;
    endDate: Date;
    width?: number;
    onChange: ({startDate,endDate}: {startDate:Date,endDate:Date}) => any;
}

const handleKeyDown = (e: any) => {

};

const DateRangePicker: React.FC<Props> = ({width, startDate, endDate,onChange}: Props ) => {

    console.error({startDate,endDate});

    const [showPicker,setShowPicker] =  React.useState(false);

    const [{start,end},setDateRange] = React.useState({start:startDate,end:endDate});

    const [{startDateInput,endDateInput}, setDateInputValues] = React.useState({startDateInput: format(startDate, DISPLAY_DATE_FORMAT), endDateInput: format(endDate, DISPLAY_DATE_FORMAT)});

    React.useEffect(()=>{
        setDateRange({start:startDate,end:endDate});
        setDateInputValues({startDateInput: format(startDate, DISPLAY_DATE_FORMAT), endDateInput: format(endDate, DISPLAY_DATE_FORMAT)});
    },[startDate,endDate]);

    React.useEffect(()=>{
        document.addEventListener("onkeydown",handleKeyDown);
    },[])

         const selectionRange = {
             startDate: start,
             endDate: end,
             key: 'selection',
         };


    return (
        <Container>
            <ControlContainer onClick={() => setShowPicker(true)}>
                <Icon>
                    <FontAwesomeIcon icon={faCalendar} color={colors.ORANGE[800]} />
                </Icon>
                <Control width={width}>
                    <InputBox
                        color={colors.WHITE[500]}
                        value={startDateInput}
                        onChange={(newValue) => {
                            if(newValue.length === 11 &&
                                isValid(new Date(newValue))) {

                                onChange({startDate: new Date(newValue), endDate: end});
                                }else{
                                    setDateInputValues({startDateInput: newValue,endDateInput})
                                }
                        }}
                        label={''}
                        height={32}
                        textAlign="center"
                        invisible
                    />
                    <RightArrow>
                        <FontAwesomeIcon icon={faLongArrowAltRight} color={colors.ORANGE[800]} />
                    </RightArrow>
                    <InputBox
                        color={colors.WHITE[500]}
                        value={endDateInput}
                        onChange={(newValue) => {
                             if (newValue.length === 11 && isValid(new Date(newValue))) {
                                 onChange({endDate: new Date(newValue), startDate: startDate});
                             } else {
                                 setDateInputValues({endDateInput: newValue, startDateInput});
                             }
                        }}
                        label={''}
                        height={32}
                        textAlign="center"
                        invisible
                    />
                </Control>
            </ControlContainer>
            {showPicker && (
                <CalanderContainer>
                    <DateRange
                        ranges={[selectionRange]}
                        onChange={(newRange) =>
                            onChange({
                                startDate: newRange.selection.startDate,
                                endDate: newRange.selection.endDate,
                            })
                        }
                        showDateDisplay={false}
                        rangeColors={[colors.ORANGE[800]]}
                    />
                    <Row justifyContent="space-evenly" padding="8px">
                        <Button
                            color={colors.BLACK[100]}
                            fillColor={colors.WHITE[500]}
                            textColor={colors.BLACK[100]}
                            hoverColor={colors.ORANGE[800]}
                            onClick={() => setShowPicker(false)}
                            width={160}
                        >
                            Cancel
                        </Button>
                        <Button
                            color={colors.BLACK[100]}
                            fillColor={colors.WHITE[500]}
                            textColor={colors.BLACK[100]}
                            hoverColor={colors.ORANGE[800]}
                            onClick={() => setShowPicker(false)}
                            width={160}
                        >
                            Apply
                        </Button>
                    </Row>
                </CalanderContainer>
            )}
        </Container>
    );
};

export {DateRangePicker, DISPLAY_DATE_FORMAT};
