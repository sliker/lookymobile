import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initSignOut } from '../data/user/userActions';
import I18n from '../i18n/i18n';

import ListItemSeparator from '../components/Common/ListItemSeparator/ListItemSeparator';
import ListItem from '../components/Common/ListItem/ListItem';
import ListTitle from '../components/Common/ListTitle/ListTitle';

import styles from './styles';

class SettingsContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.onItemPress = this.onItemPress.bind(this);
  }

  onItemPress(key) {
    const { userActions } = this.props;
    switch (key) {
      case 'logout':
        userActions.initSignOut();
        break;
      default:
        break;
    }
  }

  render() {
    const accountItems = [
      {
        key: 'editProfile',
        title: I18n.t('settings.account.editProfile'),
      },
      {
        key: 'deleteAccount',
        title: I18n.t('settings.account.deleteAccount'),
      },
      {
        key: 'changePassword',
        title: I18n.t('settings.account.changePassword'),
      },
      {
        key: 'logout',
        title: I18n.t('settings.account.logout'),
      },
    ];
    const aboutItems = [
      {
        key: 'terms',
        title: I18n.t('settings.about.terms'),
      },
      {
        key: 'privacy',
        title: I18n.t('settings.about.privacy'),
      },
    ];

    return (
      <ScrollView>
        <View style={styles.listView}>
          <ListTitle title={I18n.t('settings.label.account')} />
          <FlatList
            ItemSeparatorComponent={ListItemSeparator}
            scrollEnabled={false}
            data={accountItems}
            renderItem={({item}) => (
              <ListItem
                item={item}
                onPress={this.onItemPress}
              />
            )}
          />
        </View>

        <View style={styles.listView}>
          <ListTitle title={I18n.t('settings.label.about')} />
          <FlatList
            ItemSeparatorComponent={ListItemSeparator}
            scrollEnabled={false}
            data={aboutItems}
            renderItem={({item}) => (
              <ListItem
                item={item}
                onPress={this.onItemPress}
              />
            )}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userActions: bindActionCreators({
      initSignOut,
    }, dispatch),
  }
};

export default connect(null, mapDispatchToProps)(SettingsContainer);
