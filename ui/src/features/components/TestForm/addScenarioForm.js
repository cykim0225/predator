import RectangleAlignChildrenLeft from '../../../components/RectangleAlign/RectangleAlignChildrenLeft'
import Slider from 'material-ui/Slider';

import React, { useState } from 'react';
import ProcessorsDropDown from './ProcessorsDropDown';
import Input from '../../../components/Input';
import TitleInput from '../../../components/TitleInput';
import JSEditor from './JSEditor';

const AddScenarioForm = (props) => {
  const onChangeValue = (key, value) => {
    const { onChangeValue } = props;
    onChangeValue(key, value);
  };

  const { scenario, allowedWeight, processorsExportedFunctions, shouldOpenJSEditor } = props;
  const [JSContent, setJSContent] = useState('module.exports = {\n' +
  '    beforeScenario,\n' +
  '    afterScenario,\n' +
  '};\n' +
  'function beforeScenario(context, ee, next) {\n' +
  '    return next(); // MUST be called for the scenario to continue\n' +
  '}\n' +
  'function afterScenario(context, ee, next) {\n' +
  '    return next(); // MUST be called for the scenario to continue\n' +
  '}')

  const onInputJSCodeChange = (code) => {
    setJSContent(code)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', width: '100%' }}>

      <TitleInput title={'Scenario Name'}>
        <Input value={scenario.scenario_name} onChange={(evt) => {
          onChangeValue('scenario_name', evt.target.value);
        }} />
      </TitleInput>

      <TitleInput style={{ marginTop: '10px' }} title={'Before Scenario'}>
        <ProcessorsDropDown options={processorsExportedFunctions}
          onChange={(value) => onChangeValue('beforeScenario', value)}
          value={scenario.beforeScenario} />
      </TitleInput>
      <TitleInput style={{ marginTop: '10px' }} title={'After Scenario'}>
        <ProcessorsDropDown options={processorsExportedFunctions}
          onChange={(value) => onChangeValue('afterScenario', value)}
          value={scenario.afterScenario} />
      </TitleInput>

      {shouldOpenJSEditor && (
        <div>
          <Header style={{ marginTop: '11px' }} text={'JS Editor'} />
          <JSEditor javaScript={JSContent} onInputCodeChange={onInputJSCodeChange} />
        </div>
      )}

      <div style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {!!allowedWeight &&
        <RectangleAlignChildrenLeft>
          <span>0%</span>
          <div>
            <Slider
              style={{ width: '245px' }}
              min={0}
              max={allowedWeight}
              step={1}
              value={scenario.weight || 0}
              onChange={(event, value) => onChangeValue('weight', value)}
            />
          </div>
          <span>{allowedWeight}%</span>
        </RectangleAlignChildrenLeft>}
        <span>The weight of this scenario will be: {scenario.weight || 0}%</span>

        {!allowedWeight && <span>The weights of all your other scenarios is 100%</span>}

      </div>
    </div>
  )
}
const Header = ({ text, style = {} }) => {
  return (
    <div style={{
      // fontFamily: 'Roboto',
      fontSize: '20px',
      fontWeight: '300',
      fontStretch: 'normal',
      fontStyle: 'italic',
      color: '#778195',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      marginBottom: '11px',
      ...style
    }}>{text}</div>
  )
}

export default AddScenarioForm;
