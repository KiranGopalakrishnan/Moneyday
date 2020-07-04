import * as React from 'react';
import styled from 'styled-components';
import {FlexContainer, Section, Row} from '../../../common/styles/Styles';
import {Button} from '../../../common/components/Button/Button';
import {Spinner} from '../../../common/components/Spinner/Spinner';
import { colors } from '../../../common/Colors';
import { InputBox } from '../../../common/components/InputBox/InputBox';
import Switch from 'react-switch';

const Container = styled(FlexContainer)`
    padding: 32px;
`;

const Label = styled.label`
    font-size: 16px;
    color: ${colors.GREY[900]};
    font-weight: 500;
    align-items: flex-start;
    box-sizing: border-box;
    padding: 8px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    height: 58px;
    width: 300px;
`;

const Control = styled.div`
    padding: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 58px;
    justify-content: center;
    box-sizing: border-box;
`;

const SettingRow = styled(Row)`
    padding: 12px 0;
`;


const General: React.FC = () => {

    const [timetracking,setTimetracking] =  React.useState(false);

    return (
        <Container>
            <Section>
                <SettingRow>
                    <Label>Budget</Label>
                    <Control>
                        <InputBox
                            value={undefined}
                            onChange={console.error}
                            label="Budget"
                            color={colors.GREY[900]}
                            placeholder="Budget"
                        />
                    </Control>
                </SettingRow>
                <SettingRow>
                    <Label>Integrate with time tracking</Label>
                    <Control>
                        <Switch
                            onChange={() => setTimetracking(!timetracking)}
                            checked={timetracking}
                            height={24}
                        />
                    </Control>
                </SettingRow>
            </Section>
        </Container>
    );
};

export {General};
