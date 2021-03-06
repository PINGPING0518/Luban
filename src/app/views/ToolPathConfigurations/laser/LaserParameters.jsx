import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { TOOLPATH_TYPE_IMAGE, TOOLPATH_TYPE_VECTOR } from '../../../constants';
import i18n from '../../../lib/i18n';
import { TextInput } from '../../../components/Input';
import widgetStyles from '../../../widgets/styles.styl';
import TipTrigger from '../../../components/TipTrigger';
import GcodeParameters from './GcodeParameters';

class LaserParameters extends PureComponent {
    static propTypes = {
        toolPath: PropTypes.object.isRequired,

        updateToolPath: PropTypes.func.isRequired,
        updateGcodeConfig: PropTypes.func.isRequired
    };

    state = {
    };

    actions = {
    };

    render() {
        const { toolPath } = this.props;

        const { name, type, gcodeConfig } = toolPath;

        const { direction, movementMode } = gcodeConfig;


        // eslint-disable-next-line no-unused-vars
        const isSVG = type === TOOLPATH_TYPE_VECTOR;
        const isImage = type === TOOLPATH_TYPE_IMAGE;

        return (
            <React.Fragment>
                <div className="sm-parameter-container">
                    <div className="sm-parameter-row">
                        <span className="sm-parameter-row__label">{i18n._('Name')}</span>
                        <TextInput
                            className="sm-parameter-row__input"
                            value={name}
                            onChange={(event) => { this.props.updateToolPath({ name: event.target.value }); }}
                        />
                    </div>
                    {isImage && (
                        <div>
                            <TipTrigger
                                title={i18n._('Line Direction')}
                                content={i18n._('Select the direction of the engraving path.')}
                            >
                                <div className="sm-parameter-row">
                                    <span className="sm-parameter-row__label">{i18n._('Line Direction')}</span>
                                    <Select
                                        backspaceRemoves={false}
                                        className="sm-parameter-row__select"
                                        clearable={false}
                                        menuContainerStyle={{ zIndex: 5 }}
                                        name="line_direction"
                                        options={[{
                                            value: 'Horizontal',
                                            label: i18n._('Horizontal')
                                        }, {
                                            value: 'Vertical',
                                            label: i18n._('Vertical')
                                        }, {
                                            value: 'Diagonal',
                                            label: i18n._('Diagonal')
                                        }, {
                                            value: 'Diagonal2',
                                            label: i18n._('Diagonal2')
                                        }]}
                                        placeholder=""
                                        searchable={false}
                                        value={direction}
                                        onChange={(option) => { this.props.updateGcodeConfig({ direction: option.value }); }}
                                    />
                                </div>
                            </TipTrigger>
                            <div className="sm-parameter-row">
                                <span className="sm-parameter-row__label">{i18n._('Movement Mode')}</span>
                                <Select
                                    backspaceRemoves={false}
                                    className="sm-parameter-row__select-lg"
                                    clearable={false}
                                    menuContainerStyle={{ zIndex: 5 }}
                                    name="Movement"
                                    options={[{
                                        value: 'greyscale-line',
                                        label: i18n._('Line (Normal Quality)')
                                    }, {
                                        value: 'greyscale-dot',
                                        label: i18n._('Dot (High Quality)')
                                    }]}
                                    placeholder={i18n._('Choose movement mode')}
                                    searchable={false}
                                    value={movementMode}
                                    onChange={this.actions.onChangeMovementMode}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className={classNames(widgetStyles.separator)} />
                <GcodeParameters
                    toolPath={this.props.toolPath}
                    updateGcodeConfig={this.props.updateGcodeConfig}
                />
            </React.Fragment>
        );
    }
}

export default LaserParameters;
