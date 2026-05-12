import PropTypes from 'prop-types';
import CustomSelect from './CustomSelect';

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia',
  'Austria','Azerbaijan','Bahrain','Bangladesh','Belarus','Belgium','Belize','Benin',
  'Bhutan','Bolivia','Bosnia and Herzegovina','Botswana','Brazil','Brunei','Bulgaria',
  'Burkina Faso','Burundi','Cambodia','Cameroon','Canada','Chad','Chile','China',
  'Colombia','Congo','Costa Rica','Croatia','Cuba','Cyprus','Czech Republic','Denmark',
  'Djibouti','Dominican Republic','Ecuador','Egypt','El Salvador','Estonia','Ethiopia',
  'Finland','France','Gabon','Georgia','Germany','Ghana','Greece','Guatemala','Guinea',
  'Haiti','Honduras','Hungary','Iceland','India','Indonesia','Iran','Iraq','Ireland',
  'Israel','Italy','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kuwait','Kyrgyzstan',
  'Laos','Latvia','Lebanon','Libya','Lithuania','Luxembourg','Madagascar','Malaysia',
  'Maldives','Mali','Malta','Mexico','Moldova','Mongolia','Morocco','Mozambique','Myanmar',
  'Namibia','Nepal','Netherlands','New Zealand','Nicaragua','Niger','Nigeria','Norway',
  'Oman','Pakistan','Palestine','Panama','Paraguay','Peru','Philippines','Poland',
  'Portugal','Qatar','Romania','Russia','Rwanda','Saudi Arabia','Senegal','Serbia',
  'Sierra Leone','Singapore','Slovakia','Slovenia','Somalia','South Africa','South Korea',
  'Spain','Sri Lanka','Sudan','Sweden','Switzerland','Syria','Taiwan','Tajikistan',
  'Tanzania','Thailand','Togo','Tunisia','Turkey','Turkmenistan','UAE','Uganda','Ukraine',
  'United Kingdom','Uruguay','USA','Uzbekistan','Venezuela','Vietnam','Yemen','Zambia','Zimbabwe',
];

export default function CountrySelect({ value, onChange, error }) {
  return (
    <CustomSelect
      value={value}
      onChange={onChange}
      options={COUNTRIES}
      placeholder="Select country"
      error={error}
      isSearchable
    />
  );
}

CountrySelect.propTypes = {
  value:    PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error:    PropTypes.string,
};
CountrySelect.defaultProps = { value: '', error: '' };
