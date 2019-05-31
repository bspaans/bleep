import { SequenceTrack } from './sequence_track.js'; 

export class Channel {
  constructor(channelNr, openInstrumentEditor) {
    this.channelNr = channelNr;
    this.instrument = null;
    this.sequenceTracks = [new SequenceTrack()];
    this.name = "Untitled " + this.channelNr;
    for (var i = 0; i < channelNr; i++) {
      this.sequenceTracks.push(new SequenceTrack());
    }

    this.loadFromDefinition({});
  }

  loadFromDefinition(def) {
    this.bank = def.bank || null;
    this.bankIndex = def.instrument || null;
    this.reverb = def.reverb || 0;
    this.reverbTime = def.reverb_time || 0;
    this.reverbFeedback = def.reverb_feedback || 0;
    this.tremelo = def.tremelo || 0;
    this.volume = def.volume || 100;
    this.panning = def.panning || 64;
    this.lpfCutoff = def.lpf_cutoff || 0;
    this.hpfCutoff = def.hpf_cutoff || 0;
    this.grain = def.grain || null;

  }

  compile() {
    var channel = {
      "channel": this.channelNr,
      "generator": this.instrument ? this.instrument.compile() : null,
      "bank": this.bank,
      "instrument": this.bankIndex,
      "reverb": this.reverb,
      "reverb_time": this.reverbTime,
      "reverb_feedback": this.reverbFeedback,
      "tremelo": this.tremelo,
      "volume": this.volume,
      "panning": this.panning,
      "lpf_cutoff": this.lpfCutoff,
      "hpf_cutoff": this.hpfCutoff,
      "grain": this.grain,
    };
    var sequences = [];
    for (var tr of this.sequenceTracks) {
      var trResult = tr.compile();
      if (trResult) {
        sequences.push(trResult);
      }
    }
    return {
      "channel": channel,
      "sequences": sequences,
    };
  }

  initialiseSequenceTracks(sequences) {
    this.sequenceTracks = [];
    for (var s of sequences) {
      var segment = {};
      if (s.after) {
        segment.after = s.after.after;
        if (s.after.sequence.before) {
          segment.before = s.after.sequence.before.before;
        }
      } else if (s.before) {
        segment.before = s.before.before;
        if (s.before.sequence.after) {
          segment.after = s.before.sequence.after.after;
        }
      }
      var track = new SequenceTrack(s);
      track.addRange(segment.after, segment.before);
      this.sequenceTracks.push(track);
    }
  }
}
