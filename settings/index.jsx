function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Theme Color</Text>}>
        <ColorSelect
          settingsKey="themeColor"
          colors={[
            {color: "tomato"},
            {color: "sandybrown"},
            {color: "#FFD700"},
            {color: "#ADFF2F"},
            {color: "deepskyblue"},
            {color: "plum"}
          ]}
        />
      </Section>

      <Section>
        <Select
          label={'Activity 1'}
          settingsKey="circle0"
            options={[
              {name:"Steps",          value:"0"},
              {name:"Distance",       value:"1"},
              {name:"Calories",       value:"2"},
              {name:"Elevation Gain", value:"3"},
              {name:"Active Zone Minutes", value:"4"}
            ]}
        />
      </Section>
      <Section>
        <Select
          label={'Activity 2'}
          settingsKey="circle1"
            options={[
              {name:"Steps",          value:"0"},
              {name:"Distance",       value:"1"},
              {name:"Calories",       value:"2"},
              {name:"Elevation Gain", value:"3"},
              {name:"Active Zone Minutes", value:"4"}
            ]}
        />
      </Section>
      <Section>
        <Select
          label={'Activity 3'}
          settingsKey="circle2"
            options={[
              {name:"Steps",          value:"0"},
              {name:"Distance",       value:"1"},
              {name:"Calories",       value:"2"},
              {name:"Elevation Gain", value:"3"},
              {name:"Active Zone Minutes", value:"4"}
            ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
