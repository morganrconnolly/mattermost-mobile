// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';

import CompassIcon from '@components/compass_icon';
import {paddingHorizontal as padding} from '@components/safe_area_view/iphone_x_spacing';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

export const RECENT_LABEL_HEIGHT = 42;

export default class RecentItem extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        removeSearchTerms: PropTypes.func.isRequired,
        setRecentValue: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
        isLandscape: PropTypes.bool.isRequired,
    };

    static defaultProps = {
        isLandscape: false,
    };

    handlePress = () => {
        const {item, setRecentValue} = this.props;

        setRecentValue(item);
    };

    handleRemove = () => {
        const {item, removeSearchTerms} = this.props;
        removeSearchTerms(item);
    };

    render() {
        const {item, theme, isLandscape} = this.props;
        const style = getStyleFromTheme(theme);

        return (
            <TouchableHighlight
                key={item.terms}
                underlayColor={changeOpacity(theme.sidebarTextHoverBg, 0.5)}
                onPress={this.handlePress}
            >
                <View
                    style={[style.recentItemContainer, padding(isLandscape)]}
                >
                    <Text
                        style={style.recentItemLabel}
                    >
                        {item.terms}
                    </Text>
                    <TouchableOpacity
                        onPress={this.handleRemove}
                        style={style.recentRemove}
                    >
                        <CompassIcon
                            name='close-circle-outline'
                            size={20}
                            color={changeOpacity(theme.centerChannelColor, 0.6)}
                        />
                    </TouchableOpacity>
                </View>
            </TouchableHighlight>
        );
    }
}

const getStyleFromTheme = makeStyleSheetFromTheme((theme) => {
    return {
        recentItemContainer: {
            alignItems: 'center',
            flex: 1,
            flexDirection: 'row',
            height: RECENT_LABEL_HEIGHT,
        },
        recentItemLabel: {
            color: theme.centerChannelColor,
            fontSize: 14,
            height: 20,
            flex: 1,
            paddingHorizontal: 16,
        },
        recentRemove: {
            alignItems: 'center',
            height: RECENT_LABEL_HEIGHT,
            justifyContent: 'center',
            width: 50,
        },
    };
});
