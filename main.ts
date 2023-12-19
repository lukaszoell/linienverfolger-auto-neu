let lastDir = 0
let lastBlack = 0
let lastWhite = 0
let lastState = 0
let abstand = 0
music.play(music.stringPlayable("C D E F G A B C5 ", 120), music.PlaybackMode.UntilDone)
basic.showIcon(IconNames.Happy)
let strip = neopixel.create(DigitalPin.P15, 4, NeoPixelMode.RGB)
basic.forever(function () {
    abstand = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (abstand < 10 && lastState == 0) {
        maqueen.motorStop(maqueen.Motors.All)
        strip.showColor(neopixel.colors(NeoPixelColors.Black))
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOn)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOn)
        music.play(music.tonePlayable(262, music.beat(BeatFraction.Whole)), music.PlaybackMode.UntilDone)
        maqueen.writeLED(maqueen.LED.LEDLeft, maqueen.LEDswitch.turnOff)
        maqueen.writeLED(maqueen.LED.LEDRight, maqueen.LEDswitch.turnOff)
        lastState = 1
    } else if (abstand > 10 && lastState == 1) {
        strip.showColor(neopixel.colors(NeoPixelColors.Red))
        lastState = 0
        lastWhite = 0
        lastBlack = 0
        if (lastDir == 1) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 128)
        } else {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 128)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
        }
    }
    if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0 && maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
        if (control.millis() - lastBlack > 600) {
            maqueen.motorStop(maqueen.Motors.All)
        }
        if (lastBlack == 0) {
            lastBlack = control.millis()
        }
        lastWhite = 0
    } else {
        lastBlack = 0
        if (maqueen.readPatrol(maqueen.Patrol.PatrolLeft) == 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 128)
            lastWhite = 0
            lastDir = 1
        } else if (maqueen.readPatrol(maqueen.Patrol.PatrolRight) == 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 128)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
            lastWhite = 0
            lastDir = 2
        } else {
            if (lastWhite == 0) {
                lastWhite = control.millis()
            } else {
                if (control.millis() - lastWhite > 600 && control.millis() - lastWhite < 2000) {
                    if (lastDir == 1) {
                        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 0)
                        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 255)
                    } else if (lastDir == 2) {
                        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 255)
                        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 0)
                    }
                } else if (control.millis() - lastWhite > 2000) {
                    maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 0)
                }
            }
        }
    }
})
