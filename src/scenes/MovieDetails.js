import React, {
  Component,
  View,
  Image,
  ScrollView,
  Text,
  Linking,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

export default class SceneMovieDetails extends Component {

  runtime(num) {
    let ori = num;
    const hours = Math.floor(num / 60);
    const minutes = ori - (hours * 60);
    return `${hours} klst ${minutes} mín`;
  }

  groupByCinema(arr) {
    var cinemas = [];
    arr.map(d => d.cinema)
    .filter((v, i, self) => {
      return self.indexOf(v) === i;
    }).forEach(name => {
      cinemas.push(arr.filter(d => d.cinema === name));
    });
    return cinemas;
  }

  openUrl(url) {
    return Linking.openURL(url)
    .catch(err => console.error('An error occurred', err));
  }

  /**
   * Render method
   * @return {Component}
   */
  render () {
    const {
      title,
      year,
      genres,
      runtime,
      rating,
      metascore,
      synoptis,
      directors,
      actors,
      backdrop,
      showtimes,
    } = this.props;

    return (
      <View style={s.container}>
        <ScrollView style={{ flex: 1 }}>
          <Image style={s.cover} resizeMode="cover" source={{ uri: backdrop }}>
            <LinearGradient
              start={[0.0, 0.0]}
              end={[0.0, 1.0]}
              locations={[0, 0.5, 1.0]}
              colors={['transparent', 'transparent', '#000']}
              style={{ flex: 1, opacity: 0.9 }}
            />
            <View style={s.coverContent}>
              <Text style={s.title}>
                {title}
                <Text style={s.year}> ({year})</Text>
              </Text>
              <Text style={s.trailer}>{this.runtime(runtime)}</Text>
            </View>
          </Image>
          <View style={s.detail}>
            <View style={s.bar}>
              <Text style={s.genres}>{genres.join(' | ')}</Text>
              <View style={s.row}>
                <Icon name="star" size={14} color="#FAD600" style={{marginTop: 1}}/>
                <Text style={s.rating}>{rating}/10</Text>
                <Text style={s.metascore}>{metascore}</Text>
                <Text style={s.runtime}>Metascore</Text>
              </View>
            </View>
            <Text style={s.label}>Söguþráður</Text>
            <Text style={s.synoptis}>{synoptis}</Text>
            <Text><Text style={s.bold}>Leikstjórn: </Text> {directors.join(', ')}</Text>
            <Text><Text style={s.bold}>Leikarar: </Text> {actors.join(', ')}</Text>
          </View>
          <View style={s.showtimes}>
            {this.groupByCinema(showtimes).map((cinema, ci) => (
              <View key={`cinema_${ci}`} style={s.showtimeGroup}>
                <Text style={s.showtimeCinema}>{cinema[0].cinema}</Text>
                <View style={s.showtimeItems}>
                  {cinema.map((showtime, si) => (
                    <TouchableHighlight
                      key={`showtime_${si}`}
                      underlayColor="#f8f8ee"
                      onPress={() => this.openUrl(showtime.ticketUrl)}>
                      <View style={s.showtimeItem}>
                        <Text style={s.showtimeHour}>{showtime.hour}</Text>
                        <Text style={s.showtimeHall}>{showtime.hall}</Text>
                        {showtime.flags.map((flag, fi) => (
                          <Text
                            key={`flag_${fi}`}
                            style={[s.showtimeFlag, s[`showtimeFlag_${flag}`]]}>
                            {flag}
                          </Text>
                        ))}
                      </View>
                    </TouchableHighlight>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

/**
 * @const {StyleSheet} Component styles
 */
const s = StyleSheet.create({
  container: {
    flex: 1,
  },

  cover: {
    flex: 1,
    position: 'relative',
    height: 200,
  },

  coverContent: {
    position: 'absolute',
    bottom: 12,
    left: 10,
  },

  title: {
    backgroundColor: 'transparent',
    color: '#fff',
    fontSize: 21,
    fontWeight: '300',
  },

  year: {
    backgroundColor: 'transparent',
    color: '#eee',
    fontSize: 13,
    fontWeight: '300',
  },

  trailer: {
    backgroundColor: 'transparent',
    color: '#fff',
  },

  bar: {
    marginBottom: 12,
  },

  genres: {
    fontSize: 13,
    fontWeight: '300',
    color: '#777',
  },

  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
  },

  bold: {
    fontWeight: '600',
  },

  row: {
    flexDirection: 'row',
    marginTop: 5,
  },

  runtime: {
    fontSize: 13,
    fontWeight: '300',
    color: '#1a1a1a',
    marginRight: 8,
  },

  rating: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    marginLeft: 4,
    marginRight: 8,
    marginTop: 1,
  },

  metascore: {
    backgroundColor: '#eee',
    paddingTop: 1,
    paddingBottom: 0,
    paddingLeft: 3,
    paddingRight: 3,
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    marginRight: 4,
  },

  synoptis: {
    marginBottom: 12,
  },

  detail: {
    flex: 1,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  showtimes: {
    padding: 12,
    borderTopWidth: 12,
    borderTopColor: '#f8f8f8',
  },

  showtimeGroup: {
    flexDirection: 'row',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
    paddingBottom: 12,
  },

  showtimeCinema: {
    flex: 1,
    fontWeight: '500',
  },

  showtimeItems: {
    flex: 1,
    marginTop: -3,
  },

  showtimeItem: {
    flexDirection: 'row',
    padding: 3,
  },

  showtimeHour: {
    paddingRight: 6,
    fontSize: 16,
    fontWeight: '300',
  },

  showtimeHall: {
    color: '#666',
    fontSize: 15,
    fontWeight: '300',
  },

  showtimeFlag: {
    paddingLeft: 4,
  }

});