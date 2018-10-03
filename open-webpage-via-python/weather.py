from weather import Weather, Unit

weather = Weather(unit=Unit.CELSIUS)

#lookup=weather.lookup(560743)
#condition= lookup.condition
location=weather.lookup_by_location('guangzhou')
condition=location.condition
print("tempeture is" + " " + condition.temp + " condition is " + condition.text)
