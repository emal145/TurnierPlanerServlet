package Model;

public class Tournament {

	private int id;
	private String name;
	private int duration;
	private RoundType type;
	private int count;
	private String[] teams;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public RoundType getType() {
		return type;
	}
	public void setType(RoundType type) {
		this.type = type;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String[] getTeams() {
		return teams;
	}
	public void setTeams(String[] teams) {
		this.teams = teams;
	}
	
	
	
}
