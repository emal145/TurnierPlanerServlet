package Rest;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import Model.Tournament;
import Service.TournamentService;

@Path("/tournament")
public class TournamentRestService {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Tournament getDefaultUserInJSON() {
    	TournamentService userService = new TournamentService();
        return userService.getTournament();
    }
}
