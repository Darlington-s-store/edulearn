import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Users, 
  Award, 
  BookOpen, 
  Video, 
  Trophy,
  Target,
  Lightbulb,
  Shield,
  Globe,
  Star,
  CheckCircle
} from 'lucide-react';

function About() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "Former teacher with 15+ years of experience in education technology."
    },
    {
      name: "Michael Chen",
      role: "Head of Technology",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Expert in building scalable educational platforms and child-safe technology."
    },
    {
      name: "Dr. Emily Davis",
      role: "Chief Learning Officer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "PhD in Educational Psychology with focus on child development and learning."
    },
    {
      name: "James Wilson",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
      description: "Specialist in creating engaging, kid-friendly user experiences."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Child-Centered Learning",
      description: "Every feature is designed with children's needs, safety, and development in mind."
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "We maintain the highest standards of online safety and privacy protection for kids."
    },
    {
      icon: Lightbulb,
      title: "Innovation in Education",
      description: "We constantly innovate to make learning more engaging and effective."
    },
    {
      icon: Globe,
      title: "Accessible Learning",
      description: "Quality education should be accessible to every child, everywhere."
    }
  ];

  const achievements = [
    {
      number: "50,000+",
      label: "Happy Students",
      icon: Users
    },
    {
      number: "2,500+",
      label: "Expert Teachers",
      icon: Award
    },
    {
      number: "15+",
      label: "Countries Served",
      icon: Globe
    },
    {
      number: "98%",
      label: "Parent Satisfaction",
      icon: Star
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-purple-50 to-mint-50 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNjM2Y0ZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSI0Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 font-playful">
            About{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-500">
              Lovable
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We believe every child deserves access to quality education that sparks curiosity, 
            builds confidence, and makes learning an adventure they look forward to every day.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6 font-playful">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Lovable, we are on a mission to revolutionize education for children aged 6-16. 
                We combine cutting-edge technology with proven educational methods to create an 
                environment where learning is not just effective, but genuinely enjoyable.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our platform bridges the gap between traditional classroom learning and modern 
                digital education, ensuring every child can thrive regardless of their learning style or location.
              </p>
              <div className="flex items-center gap-4">
                <Target className="w-8 h-8 text-primary-600" />
                <span className="text-lg font-semibold text-gray-800">
                  Making quality education accessible to every child
                </span>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop"
                alt="Children learning together"
                className="w-full h-96 object-cover rounded-3xl shadow-large"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-large">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-mint-400 to-mint-600 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">5+ Years</p>
                    <p className="text-sm text-gray-600">Educational Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-playful">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the experience we create for our students and families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card p-6 text-center group hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-playful">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {"We're proud of the positive impact we've made in the lives of students, families, and educators worldwide."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-gray-800 mb-2">{achievement.number}</h3>
                <p className="text-gray-600 font-medium">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-playful">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our passionate team of educators, technologists, and child development experts work together 
              to create the best learning experience for your children.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="card p-6 text-center group hover:scale-105 transition-transform">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-purple-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6 font-playful">
            Ready to Join Our Learning Family?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            {"Discover why thousands of families trust Lovable for their children's education. Start your journey today!"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup/student" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-4 px-8 rounded-2xl transition-all duration-200 transform hover:-translate-y-1">
              Start Learning Today
            </Link>
            <Link to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-4 px-8 rounded-2xl transition-all duration-200">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
