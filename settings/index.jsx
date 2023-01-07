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

      <Section
        title={<Text bold align="center">Activity 1</Text>}>
        <Select
          label={'multiselection'}
          settingsKey="circle1"
            options={[
              {name:"steps",          value:"1"},
              {name:"Distance",       value:"2"},
              {name:"Calories",       value:"3"},
              {name:"Active Minutes", value:"4"}
            ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Activity 2</Text>}>
        <Select
          label={'multiselection'}
          settingsKey="circle2"
            options={[
              {name:"steps",          value:"1"},
              {name:"Distance",       value:"2"},
              {name:"Calories",       value:"3"},
              {name:"Active Minutes", value:"4"}
            ]}
        />
      </Section>
      <Section
        title={<Text bold align="center">Activity 3</Text>}>
        <Select
          label={'multiselection'}
          settingsKey="circle3"
            options={[
              {name:"steps",          value:"1"},
              {name:"Distance",       value:"2"},
              {name:"Calories",       value:"3"},
              {name:"Active Minutes", value:"4"}
            ]}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
