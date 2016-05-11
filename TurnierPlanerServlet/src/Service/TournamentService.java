package Service;

import Model.RoundType;
import Model.Tournament;

public class TournamentService {

	public Tournament getTournament(){
		Tournament tournament =  new Tournament();
		tournament.setId(1010);
		tournament.setName("MyTournament");
		tournament.setDuration(10);
		tournament.setCount(3);
		tournament.setType(RoundType.RoundRobin);
		String[] team = {"TeamA", "TeamB", "TeamC"};
		tournament.setTeams(team);
		return tournament;
	}
	
}
